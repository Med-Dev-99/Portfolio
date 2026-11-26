#!/usr/bin/env bash
# Break-glass deploy from a workstation with root SSH to the VPS (normally CI deploys every push
# to main). Builds and tests the image exactly like CI, then uses the same gateway.
#
#   npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
  echo "Commit your changes first: the deployed image is labelled with the commit it was built from." >&2
  exit 1
fi
REVISION="$(git rev-parse HEAD)"
IMAGE="portfolio-site:$REVISION"

echo "▸ building $IMAGE"
docker build --build-arg GIT_SHA="$REVISION" -t "$IMAGE" .
bash deploy/ci/smoke-test.sh "$IMAGE" "$REVISION"

work="$(mktemp -d)"; trap 'rm -rf "$work"' EXIT
docker save "$IMAGE" | gzip -n > "$work/image.tar.gz"
DEPLOY_HOST="${DEPLOY_HOST:-root@13.140.218.234}" bash deploy/ci/deploy.sh "$work/image.tar.gz" "$REVISION"
