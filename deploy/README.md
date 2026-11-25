# Deployment

The site runs on the Contabo VPS that also hosts FIREBRIDGE. It is fully separate from FIREBRIDGE except for one thing: the existing FIREBRIDGE Nginx proxy, which owns ports 80/443, terminates TLS for `mohamedelkorchi.com` and forwards requests to the portfolio container.

```
Internet ──443──▶ firebridge-webapp-proxy (Nginx, TLS, HSTS)
                    ├─ ogote.com, astramind.solutions ─▶ FIREBRIDGE (unchanged)
                    └─ mohamedelkorchi.com ────────────▶ portfolio-site:8080 (this repo)
                                                          Docker network: firebridge-webapp_web
```

## On the server

```
/opt/portfolio/
├── compose.yaml          # from deploy/compose.yaml
├── nginx.conf            # from deploy/nginx.conf (static file server, headers, caching)
├── proxy/                # server blocks + install.py for the shared proxy
└── www/
    ├── current -> releases/20261125T120000Z-abc1234
    └── releases/         # last 5 releases kept
```

- Container: `nginxinc/nginx-unprivileged`, read-only root filesystem, all capabilities dropped, 64 MB memory limit, no published port.
- A release is a full copy of `dist/`, pre-compressed with gzip. Switching the `current` symlink is atomic and needs no restart.
- The portfolio's blocks in `/opt/firebridge/webapp/nginx.proxy.conf` are marked `>>> portfolio … <<<`. `proxy/install.py` adds them after testing the config in a throwaway container. It keeps a timestamped backup (`nginx.proxy.conf.bak-portfolio-*`), reloads gracefully and checks that `ogote.com` still answers. On any failure it rolls back.
- TLS: Let's Encrypt certificate `mohamedelkorchi.com` (apex + www), obtained through the proxy's existing ACME webroot. The existing `certbot.timer` renews it, and the existing deploy hook reloads the proxy.

> **If FIREBRIDGE is ever re-provisioned** (`provision_server.py` copies a fresh `nginx.proxy.conf`), run `npm run deploy -- --https` again to re-add the portfolio blocks.

## Commands

```bash
npm run deploy                 # content update (any time)
npm run deploy -- --setup      # (re)install container + HTTP block
npm run deploy -- --https      # certificate + HTTPS block (needs DNS)
```

DNS in Cloudflare: `A @ → 13.140.218.234` and `A www → 13.140.218.234`, both **DNS only** (grey cloud), the same as the FIREBRIDGE domains.

### Rollback

```bash
ssh root@13.140.218.234
cd /opt/portfolio/www && ls releases/
ln -sfn releases/<previous> current.next && mv -Tf current.next current
```

### Logs and status

```bash
docker compose -f /opt/portfolio/compose.yaml ps
docker compose -f /opt/portfolio/compose.yaml logs --tail=50
certbot certificates -d mohamedelkorchi.com
```

### Remove the portfolio completely

Delete the `>>> portfolio … <<<` blocks from `/opt/firebridge/webapp/nginx.proxy.conf`, then:

```bash
cd /opt/firebridge/webapp && docker compose -f compose.yaml exec -T proxy nginx -t && docker compose -f compose.yaml exec -T proxy nginx -s reload
docker compose -f /opt/portfolio/compose.yaml down && rm -rf /opt/portfolio
certbot delete --cert-name mohamedelkorchi.com
```

## Optional: deploy from GitHub Actions

`.github/workflows/ci.yml` always type-checks and builds. To also deploy on every push to `main`:

1. Create a deploy user that can only write the releases:
   ```bash
   useradd -m -s /bin/bash portfolio-deploy
   chown -R portfolio-deploy: /opt/portfolio/www
   install -d -m 700 -o portfolio-deploy /home/portfolio-deploy/.ssh
   # append the CI public key to /home/portfolio-deploy/.ssh/authorized_keys
   ```
2. In GitHub → Settings → Environments → `production`: add secrets `DEPLOY_SSH_KEY` (the CI private key) and `DEPLOY_KNOWN_HOSTS` (`ssh-keyscan 13.140.218.234`).
3. Repository variables: `DEPLOY_HOST=portfolio-deploy@13.140.218.234` and `DEPLOY_ENABLED=true`.

Content deploys don't need Docker or root. Use `--setup`/`--https` from your own machine as root.
