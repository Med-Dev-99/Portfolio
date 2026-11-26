#!/usr/bin/env bash
# Ships a tested image archive to the VPS through the deploy gateway, activates it and checks the
# public site.
#
#   deploy/ci/deploy.sh <image.tar.gz> <revision>
#
# In CI:   DEPLOY_HOST=portfolio-deploy@<ip>, DEPLOY_SSH_KEY and DEPLOY_KNOWN_HOSTS are set; the key can
#          only run the gateway, which receives the arguments as SSH_ORIGINAL_COMMAND.
# Locally: `npm run deploy` (deploy/release-local.sh) uses root SSH and calls the same gateway.
set -euo pipefail

ARCHIVE="${1:?usage: deploy.sh <image.tar.gz> <revision>}"
REVISION="${2:?usage: deploy.sh <image.tar.gz> <revision>}"
HOST="${DEPLOY_HOST:?DEPLOY_HOST is not set}"
SITE="https://mohamedelkorchi.com"
SSH=(ssh -o BatchMode=yes -o ConnectTimeout=20 -o ServerAliveInterval=15)

if [ -n "${DEPLOY_SSH_KEY:-}" ]; then
  keys="$(mktemp -d)"; trap 'rm -rf "$keys"' EXIT
  printf '%s\n' "$DEPLOY_SSH_KEY" > "$keys/id"; chmod 600 "$keys/id"
  printf '%s\n' "${DEPLOY_KNOWN_HOSTS:?DEPLOY_KNOWN_HOSTS is not set}" > "$keys/known_hosts"
  SSH+=(-i "$keys/id" -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile="$keys/known_hosts")
  gateway() { "${SSH[@]}" "$HOST" "$*"; }
else
  gateway() { "${SSH[@]}" "$HOST" "SSH_ORIGINAL_COMMAND='$*' /usr/local/sbin/portfolio-gateway"; }
fi

sum="$(sha256sum "$ARCHIVE" | cut -d' ' -f1)"
echo "▸ uploading image $REVISION ($(du -h "$ARCHIVE" | cut -f1))"
gateway image "$REVISION" "$sum" < "$ARCHIVE"

echo "▸ activating (blue/green)"
gateway activate "$REVISION" </dev/null

echo "▸ verifying $SITE"
served=""
for _ in $(seq 1 20); do
  served="$(curl -fsS --max-time 10 "$SITE/version.txt?check=$REVISION" 2>/dev/null || true)"
  [ "$served" = "$REVISION" ] && break
  sleep 3
done
if [ "$served" != "$REVISION" ]; then
  echo "✗ $SITE serves '${served:-nothing}', expected $REVISION" >&2; exit 1
fi
curl -fsS --max-time 10 -o /dev/null "$SITE/"
curl -fsS --max-time 10 -o /dev/null "$SITE/healthz"
echo "✓ $SITE is serving $REVISION"
