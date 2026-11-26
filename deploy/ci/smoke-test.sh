#!/usr/bin/env bash
# Runs the built image with production hardening and checks what visitors and the deploy rely on.
#
#   deploy/ci/smoke-test.sh <image> <expected-revision>
set -euo pipefail

IMAGE="${1:?usage: smoke-test.sh <image> <expected-revision>}"
REVISION="${2:?usage: smoke-test.sh <image> <expected-revision>}"
NAME="portfolio-smoke-$$"
PORT="${SMOKE_PORT:-18080}"
BASE="http://127.0.0.1:$PORT"
failures=0

cleanup() { docker rm -f "$NAME" >/dev/null 2>&1 || true; }
trap cleanup EXIT

pass() { printf '  ✓ %s\n' "$1"; }
fail() { printf '  ✗ %s\n' "$1"; failures=$((failures + 1)); }
check() { local name="$1"; shift; if "$@" >/dev/null 2>&1; then pass "$name"; else fail "$name"; fi; }

echo "▸ starting $IMAGE (read-only, no capabilities, non-root)"
docker run -d --name "$NAME" \
  --read-only --tmpfs /tmp:size=16m,mode=1777 \
  --cap-drop ALL --security-opt no-new-privileges:true \
  --memory 64m --pids-limit 64 \
  -p "127.0.0.1:$PORT:8080" "$IMAGE" >/dev/null

for _ in $(seq 1 30); do
  status="$(docker inspect -f '{{.State.Health.Status}}' "$NAME" 2>/dev/null || echo missing)"
  [ "$status" = healthy ] && break
  [ "$status" = unhealthy ] || [ "$status" = missing ] && break
  sleep 1
done
if [ "$status" != healthy ]; then
  echo "container did not become healthy ($status)"; docker logs "$NAME" 2>&1 | tail -20; exit 1
fi
pass "container healthy"

echo "▸ responses"
check "GET /healthz → ok"                 sh -c "curl -fsS $BASE/healthz | grep -qx ok"
check "GET / → 200 with the site title"   sh -c "curl -fsS $BASE/ | grep -q '<title>Mohamed El Korchi'"
check "GET /version.txt → $REVISION"      sh -c "curl -fsS $BASE/version.txt | grep -qx '$REVISION'"
for page in /work/tracking-platform/ /work/firebridge/ /work/docker-inspector/ /resume/Mohamed-El-Korchi-Resume.pdf /favicon.svg /sitemap-index.xml /speculation-rules.json; do
  check "GET $page → 200"                 curl -fsS -o /dev/null "$BASE$page"
done
check "unknown path → 404 page"           sh -c "[ \"\$(curl -s -o /dev/null -w '%{http_code}' $BASE/no-such-page)\" = 404 ]"

echo "▸ headers"
headers="$(curl -fsS -D - -o /dev/null -H 'Accept-Encoding: gzip' "$BASE/")"
has() { printf '%s' "$headers" | grep -qi "^$1"; }
check "Content-Security-Policy"           has 'content-security-policy:'
check "X-Content-Type-Options: nosniff"   has 'x-content-type-options: nosniff'
check "X-Frame-Options: DENY"             has 'x-frame-options: DENY'
check "HTML is revalidated"               has 'cache-control: public, max-age=0, must-revalidate'
check "pre-compressed gzip served"        has 'content-encoding: gzip'
check "no server version leaked"          sh -c "! printf '%s' \"\$0\" | grep -qi '^server: nginx/'" "$headers"
asset="$(curl -fsS "$BASE/" | grep -o '/_astro/[^"]*\.css' | head -1)"
check "hashed assets cached immutable"    sh -c "curl -fsS -D - -o /dev/null $BASE$asset | grep -qi 'immutable'"
check "version.txt never cached"          sh -c "curl -fsS -D - -o /dev/null $BASE/version.txt | grep -qi 'cache-control: no-store'"

echo "▸ hardening"
check "runs as a non-root user"           sh -c "[ \"\$(docker exec $NAME id -u)\" != 0 ]"
check "site files are read-only"          sh -c "! docker exec $NAME touch /srv/site/index.html"
check "nginx config is valid"             docker exec "$NAME" nginx -t
check "no Node.js in the runtime image"   sh -c "! docker exec $NAME sh -c 'command -v node'"
check "no curl in the runtime image"      sh -c "! docker exec $NAME sh -c 'command -v curl'"

if [ "$failures" -gt 0 ]; then
  echo "✗ $failures check(s) failed"; docker logs "$NAME" 2>&1 | tail -20; exit 1
fi
echo "✓ all smoke checks passed"
