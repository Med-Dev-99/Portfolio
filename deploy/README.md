# Deployment

The site ships as one small Docker image: Alpine with Nginx and the static files, about 20 MB. GitHub Actions builds, tests and scans the image, then deploys it to the Contabo VPS that also hosts FIREBRIDGE. Every push to `main` goes live this way.

```
push to main
  │
  ├─ Type-check & build ─────── astro check · astro build
  ├─ Secret scan ───────────── gitleaks over the full git history
  └─ Docker image ──────────── build once → smoke test (24 checks, production hardening)
        │                       → Grype CVE scan (fixable High/Critical fail the build)
        │                       → publish ghcr.io/med-dev-99/portfolio:<sha> + :latest
        ▼
     Deploy (environment: production)
        ssh portfolio-deploy@VPS ──▶ portfolio-gateway (root-owned, the only command the key can run)
                                       image:    checksum, size limit, tag check, OCI label check, docker load
                                       activate: blue/green switch, verified through the real proxy
        then: https://mohamedelkorchi.com/version.txt must equal the commit SHA
```

## On the server

```
Internet ──443──▶ firebridge-webapp-proxy (Nginx, TLS, HSTS)
                    ├─ ogote.com, astramind.solutions ─▶ FIREBRIDGE (unchanged)
                    └─ mohamedelkorchi.com ────────────▶ portfolio-site:8080
                                                          ├─ portfolio-blue   (one of the two is live;
                                                          └─ portfolio-green   both during a switch)
                                                          Docker network: firebridge-webapp_web
```

| Path | What |
| --- | --- |
| `/usr/local/sbin/portfolio-gateway` | Deploy gateway, from [`server/portfolio-gateway`](server/portfolio-gateway) |
| `/opt/portfolio/compose.yaml` | Service definition, from [`server/compose.yaml`](server/compose.yaml): read-only filesystem, no capabilities, non-root, 64 MB, no published port |
| `/opt/portfolio/deployment.json` | Receipt: live revision, colour, time and history (used for rollback) |
| `/opt/portfolio/logs/gateway.log` | Every gateway step and failure |
| `/etc/sudoers.d/portfolio-cd` | `portfolio-deploy` may run the gateway as root, without arguments, and nothing else |
| `/etc/ssh/sshd_config.d/10-portfolio.conf` | Adds `portfolio-deploy` to the accepted users (key only) |
| `/var/lib/portfolio-deploy/.ssh/authorized_keys` | The CI key, `restrict,command="sudo -n /usr/local/sbin/portfolio-gateway"` |

**How a switch works:** the new release starts as the other colour, on the same network alias as the live one. Once it is healthy and serves the right `version.txt`, the gateway waits for the proxy's DNS cache to refresh, then stops the old release. It then checks the site through the proxy itself. If that check fails, it restarts the old release and removes the new one. The last 3 images are kept for rollbacks.

**What the CI key can do:** only the gateway's four commands (`status`, `image`, `activate`, `rollback`). An uploaded archive is rejected unless it contains exactly `portfolio-site:<revision>` with this repository's source label and that revision. So the key can never replace another image on the host, such as FIREBRIDGE's, or run anything else.

## First-time setup

1. **Server.** Generate a key for CI, then install the server side:
   ```bash
   ssh-keygen -t ed25519 -N '' -C 'github-actions:Med-Dev-99/Portfolio' -f ~/.ssh/portfolio-ci
   npm run server:setup -- --ci-key ~/.ssh/portfolio-ci.pub
   ```
   The script is idempotent. It validates the sudo rule (`visudo -c`) and the sshd change (`sshd -t`, and checks that `root` and the FIREBRIDGE users are still allowed) before reloading sshd. It prints the line for `DEPLOY_KNOWN_HOSTS`.
2. **GitHub.** Create the environment `production`, restricted to the `main` branch, with:
   - environment secret `DEPLOY_SSH_KEY`: the content of `~/.ssh/portfolio-ci`, the private key. Delete the local copy afterwards.
   - environment variable `DEPLOY_HOST`: `portfolio-deploy@13.140.218.234`
   - environment variable `DEPLOY_KNOWN_HOSTS`: the server's ed25519 host-key line, as printed by the setup script.

   Also add the **repository** variable `DEPLOY_ENABLED` = `true`. It has to be a repository variable: GitHub evaluates the deploy job's `if:` before the job enters the environment, so environment variables are not visible there.

   With the GitHub CLI:
   ```bash
   R=Med-Dev-99/Portfolio
   echo '{"deployment_branch_policy":{"protected_branches":false,"custom_branch_policies":true}}' | gh api -X PUT repos/$R/environments/production --input -
   gh api -X POST repos/$R/environments/production/deployment-branch-policies -f name=main -f type=branch
   gh secret set DEPLOY_SSH_KEY --env production -R $R < ~/.ssh/portfolio-ci
   gh variable set DEPLOY_HOST --env production -R $R --body 'portfolio-deploy@13.140.218.234'
   gh variable set DEPLOY_KNOWN_HOSTS --env production -R $R --body "13.140.218.234 $(ssh root@13.140.218.234 'cut -d" " -f1,2 /etc/ssh/ssh_host_ed25519_key.pub')"
   gh variable set DEPLOY_ENABLED -R $R --body true
   ```
3. **Packages.** After the first push to `main`, open the `portfolio` package on GitHub, go to Package settings, and make it public if you want `docker run ghcr.io/med-dev-99/portfolio` to work for everyone.

## Day to day

```bash
git push                        # CI tests, scans and deploys main automatically
npm run docker:preview          # local preview of the production image: http://localhost:8080
npm run deploy                  # break-glass deploy from this machine (root SSH, same gateway and checks)
npm run server:setup            # after changing deploy/server/* (gateway or compose file)
```

**Rollback:** run **Actions → Rollback → Run workflow**, or from a root shell:

```bash
ssh root@13.140.218.234 'SSH_ORIGINAL_COMMAND=rollback /usr/local/sbin/portfolio-gateway'
```

**Status and logs:**

```bash
ssh root@13.140.218.234 'SSH_ORIGINAL_COMMAND=status /usr/local/sbin/portfolio-gateway'
ssh root@13.140.218.234 'tail -50 /opt/portfolio/logs/gateway.log'
ssh root@13.140.218.234 'docker ps --filter label=com.docker.compose.project=portfolio-blue --filter label=com.docker.compose.project=portfolio-green'
curl https://mohamedelkorchi.com/version.txt   # commit SHA that is live
```

**Revoke CI access:** delete `/var/lib/portfolio-deploy/.ssh/authorized_keys` on the server, and the `DEPLOY_SSH_KEY` secret on GitHub.

## Proxy and TLS

The portfolio's blocks in `/opt/firebridge/webapp/nginx.proxy.conf` are marked `>>> portfolio … <<<`. [`proxy/install.py`](proxy/install.py) adds them as follows:
- it tests the config in a throwaway container first;
- it keeps a timestamped backup (`nginx.proxy.conf.bak-portfolio-*`);
- it reloads gracefully and checks that `ogote.com` still answers;
- it rolls back on any failure.

TLS uses the Let's Encrypt certificate `mohamedelkorchi.com` (apex and www). It is renewed by the existing `certbot.timer`, and the existing deploy hook reloads the proxy.

> **If FIREBRIDGE is ever re-provisioned** (`provision_server.py` copies a fresh `nginx.proxy.conf`), run `npm run server:setup -- --proxy https` to re-add the portfolio blocks.

DNS in Cloudflare: `A @ → 13.140.218.234` and `A www → 13.140.218.234`.

## Remove the portfolio completely

Delete the `>>> portfolio … <<<` blocks from `/opt/firebridge/webapp/nginx.proxy.conf` and reload the proxy. Then run:

```bash
docker rm -f $(docker ps -aq --filter label=com.docker.compose.project=portfolio-blue --filter label=com.docker.compose.project=portfolio-green)
docker image rm $(docker image ls portfolio-site -q)
rm -rf /opt/portfolio /usr/local/sbin/portfolio-gateway /etc/sudoers.d/portfolio-cd /etc/ssh/sshd_config.d/10-portfolio.conf
userdel -r portfolio-deploy && systemctl reload ssh
certbot delete --cert-name mohamedelkorchi.com
```
