#!/usr/bin/env bash
# Build the site and publish it to the VPS as an atomic release.
#
#   npm run deploy                 # content update: build, upload, switch release (no restarts)
#   npm run deploy -- --setup      # first install or config change: also installs the container + proxy blocks
#   npm run deploy -- --https      # after DNS points here: certificate + HTTPS server block
#
# Env: DEPLOY_HOST (default root@13.140.218.234), APP_DIR (default /opt/portfolio)
set -euo pipefail

HOST="${DEPLOY_HOST:-root@13.140.218.234}"
APP_DIR="${APP_DIR:-/opt/portfolio}"
SETUP=false; HTTPS=false
for arg in "$@"; do
  case "$arg" in
    --setup) SETUP=true ;;
    --https) SETUP=true; HTTPS=true ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

cd "$(dirname "$0")/.."

echo "▸ building"
npm run build --silent

echo "▸ pre-compressing"
find dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.json' -o -name '*.svg' -o -name '*.xml' -o -name '*.txt' \) \
  -size +512c -exec gzip -9 -k -f {} \;

RELEASE="$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short HEAD 2>/dev/null || echo local)"

if $SETUP; then
  echo "▸ installing server files in $APP_DIR"
  ssh "$HOST" "mkdir -p $APP_DIR/www/releases $APP_DIR/proxy"
  # --inplace keeps the inode, so the container's single-file bind mount sees the change.
  rsync -a --inplace --chmod=F644 deploy/compose.yaml deploy/nginx.conf "$HOST:$APP_DIR/"
  rsync -a --chmod=F644 deploy/proxy/ "$HOST:$APP_DIR/proxy/"
fi

echo "▸ uploading release $RELEASE"
rsync -az --delete --chmod=D755,F644 dist/ "$HOST:$APP_DIR/www/releases/$RELEASE/"

echo "▸ activating"
ssh "$HOST" "set -e
  cd $APP_DIR/www
  ln -sfn releases/$RELEASE current.next && mv -Tf current.next current
  ls -1d releases/*/ | sort -r | tail -n +6 | xargs -r rm -rf
  if $SETUP; then
    cd $APP_DIR
    docker compose -f compose.yaml up -d --wait
    docker compose -f compose.yaml exec -T site nginx -t
    docker compose -f compose.yaml exec -T site nginx -s reload
    python3 $APP_DIR/proxy/install.py $($HTTPS && echo https || echo http)
    docker compose -f compose.yaml exec -T site wget -qO /dev/null http://127.0.0.1:8080/
  fi
  test -f $APP_DIR/www/current/index.html
  echo 'release active'"

echo "✓ deployed $RELEASE"
if curl -fsS -o /dev/null --max-time 10 https://mohamedelkorchi.com/healthz 2>/dev/null; then
  echo "✓ https://mohamedelkorchi.com is live"
fi
