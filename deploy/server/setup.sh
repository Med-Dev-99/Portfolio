#!/usr/bin/env bash
# Installs (or updates) the server side of the container deployment. Run from a machine with root
# SSH access to the VPS; it is idempotent.
#
#   npm run server:setup -- --ci-key ~/.ssh/portfolio-ci.pub     # first time: authorise the CI key
#   npm run server:setup                                         # update gateway / compose only
#   npm run server:setup -- --proxy https                        # also (re)install the proxy blocks
#
# On the VPS it installs:
#   /usr/local/sbin/portfolio-gateway          root-owned deploy gateway (the only thing CI can run)
#   /opt/portfolio/compose.yaml                production service definition
#   user portfolio-deploy                      no password, no shell access: its key is forced to the gateway
#   /etc/sudoers.d/portfolio-cd                one NOPASSWD rule: the gateway, without arguments
#   /etc/ssh/sshd_config.d/10-portfolio.conf   AllowUsers portfolio-deploy (validated before reload)
#
# Env: DEPLOY_HOST (default root@13.140.218.234)
set -euo pipefail

HOST="${DEPLOY_HOST:-root@13.140.218.234}"
CI_KEY=""; PROXY=""
while [ $# -gt 0 ]; do
  case "$1" in
    --ci-key) CI_KEY="${2:?--ci-key needs a public key file}"; shift 2 ;;
    --proxy) PROXY="${2:?--proxy needs http or https}"; shift 2 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done
if [ -n "$CI_KEY" ] && ! grep -qE '^ssh-ed25519 [A-Za-z0-9+/=]+( .*)?$' "$CI_KEY"; then
  echo "$CI_KEY is not an ed25519 public key" >&2; exit 2
fi

cd "$(dirname "$0")/../.."
STAGE="$(ssh -o BatchMode=yes "$HOST" 'mktemp -d /tmp/portfolio-setup.XXXXXX')"
trap 'ssh -o BatchMode=yes "$HOST" "rm -rf $STAGE" >/dev/null 2>&1 || true' EXIT

echo "▸ uploading server files"
scp -q -o BatchMode=yes deploy/server/portfolio-gateway deploy/server/compose.yaml "$HOST:$STAGE/"
[ -n "$CI_KEY" ] && scp -q -o BatchMode=yes "$CI_KEY" "$HOST:$STAGE/ci.pub"
[ -n "$PROXY" ] && scp -q -r -o BatchMode=yes deploy/proxy "$HOST:$STAGE/proxy"

echo "▸ installing on $HOST"
ssh -o BatchMode=yes "$HOST" bash -s -- "$STAGE" "$PROXY" <<'REMOTE'
set -euo pipefail
# ssh joins arguments into one command line, so an empty PROXY arrives as no argument at all.
STAGE="$1"; PROXY="${2:-}"

python3 -m py_compile "$STAGE/portfolio-gateway"
install -o root -g root -m 0755 "$STAGE/portfolio-gateway" /usr/local/sbin/portfolio-gateway
install -d -o root -g root -m 0755 /opt/portfolio
install -d -o root -g root -m 0700 /opt/portfolio/logs
install -o root -g root -m 0644 "$STAGE/compose.yaml" /opt/portfolio/compose.yaml
PORTFOLIO_IMAGE=check docker compose -f /opt/portfolio/compose.yaml config --quiet
echo "  ✓ gateway and compose file"

if ! id portfolio-deploy >/dev/null 2>&1; then
  useradd --system --create-home --home-dir /var/lib/portfolio-deploy --shell /bin/sh \
    --comment 'CI deploys of mohamedelkorchi.com' portfolio-deploy
fi
passwd -l portfolio-deploy >/dev/null
echo "  ✓ user portfolio-deploy (password locked)"

if [ -f "$STAGE/ci.pub" ]; then
  install -d -o portfolio-deploy -g portfolio-deploy -m 0700 /var/lib/portfolio-deploy/.ssh
  printf 'restrict,command="/usr/bin/sudo -n /usr/local/sbin/portfolio-gateway" %s\n' "$(head -1 "$STAGE/ci.pub")" > "$STAGE/authorized_keys"
  install -o portfolio-deploy -g portfolio-deploy -m 0600 "$STAGE/authorized_keys" /var/lib/portfolio-deploy/.ssh/authorized_keys
  echo "  ✓ CI key authorised (forced to the gateway, no tty, no forwarding)"
fi

printf '%s\n' \
  'Defaults:portfolio-deploy env_keep += "SSH_ORIGINAL_COMMAND"' \
  'portfolio-deploy ALL=(root) NOPASSWD: /usr/local/sbin/portfolio-gateway ""' > "$STAGE/sudoers"
visudo -cqf "$STAGE/sudoers"
install -o root -g root -m 0440 "$STAGE/sudoers" /etc/sudoers.d/portfolio-cd
echo "  ✓ sudo rule"

# Add portfolio-deploy to the users sshd accepts without touching FIREBRIDGE's own file.
# AllowUsers lines accumulate; this is verified before sshd is reloaded, and reverted otherwise.
DROPIN=/etc/ssh/sshd_config.d/10-portfolio.conf
if ! sshd -T 2>/dev/null | grep -qx 'allowusers portfolio-deploy'; then
  before="$(sshd -T | grep -c '^allowusers ' || true)"
  printf '%s\n' '# mohamedelkorchi.com CI deploys: the key is forced to /usr/local/sbin/portfolio-gateway' 'AllowUsers portfolio-deploy' > "$DROPIN"
  chmod 0644 "$DROPIN"
  after="$(sshd -T 2>/dev/null | grep -c '^allowusers ' || true)"
  if ! sshd -t || [ "$after" -ne $((before + 1)) ] || ! sshd -T | grep -qx 'allowusers root'; then
    rm -f "$DROPIN"; echo "  ✗ sshd validation failed; change reverted" >&2; exit 1
  fi
  systemctl reload ssh
fi
echo "  ✓ sshd accepts portfolio-deploy (key only)"

if [ -n "$PROXY" ]; then
  rm -rf /opt/portfolio/proxy && cp -r "$STAGE/proxy" /opt/portfolio/proxy
  python3 /opt/portfolio/proxy/install.py "$PROXY"
fi

echo "  current deployment: $(SSH_ORIGINAL_COMMAND=status /usr/local/sbin/portfolio-gateway | tr -d '\n' | cut -c1-160)"
REMOTE

echo "✓ server ready"
[ -n "$CI_KEY" ] && echo "  known_hosts line for the DEPLOY_KNOWN_HOSTS variable:" && ssh-keyscan -t ed25519 "${HOST#*@}" 2>/dev/null
exit 0
