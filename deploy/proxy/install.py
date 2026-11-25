#!/usr/bin/env python3
"""Add the portfolio's server blocks to the shared FIREBRIDGE Nginx proxy, safely.

Run as root on the VPS (deploy/deploy.sh --setup does this for you):

    python3 install.py http    # ACME challenge + HTTP→HTTPS redirect (before the certificate exists)
    python3 install.py https   # obtains the certificate if needed, then serves the site over HTTPS

Safety: the candidate config is tested in a throwaway container first, the live file is
backed up, the running proxy re-tests before a graceful reload (no downtime), FIREBRIDGE
is checked afterwards, and any failure restores the backup.
"""
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

WEBAPP = Path('/opt/firebridge/webapp')
LIVE = WEBAPP / 'nginx.proxy.conf'
HERE = Path(__file__).resolve().parent
DOMAIN = 'mohamedelkorchi.com'
CERT = Path(f'/etc/letsencrypt/live/{DOMAIN}/fullchain.pem')
COMPOSE = ['docker', 'compose', '-f', str(WEBAPP / 'compose.yaml')]


def run(cmd, check=True, **kw):
    print('$', ' '.join(cmd), flush=True)
    return subprocess.run(cmd, check=check, text=True, **kw)


def insert_block(conf: str, block: str, marker: str) -> str:
    if marker in conf:
        print(f'already installed: {marker}')
        return conf
    end = conf.rstrip().rfind('}')  # closing brace of the http { } context
    if end == -1:
        sys.exit('unexpected proxy config: no closing brace')
    return conf[:end] + block.rstrip() + '\n' + conf[end:]


def test_candidate(text: str):
    image = json.loads((WEBAPP / 'deployment.json').read_text())['images']['frontend']
    candidate = Path('/tmp/portfolio-proxy-candidate.conf')
    candidate.write_text(text)
    candidate.chmod(0o644)
    run(['docker', 'run', '--rm', '--network', 'firebridge-webapp_web', '--user', '0:0', '--entrypoint', 'nginx',
         '-v', f'{candidate}:/etc/nginx/nginx.conf:ro', '-v', '/etc/letsencrypt:/etc/letsencrypt:ro',
         '-v', '/var/www/letsencrypt:/var/www/letsencrypt:ro', image, '-t'])
    candidate.unlink()


def firebridge_ok() -> bool:
    r = run(['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '--resolve', 'ogote.com:443:127.0.0.1',
             'https://ogote.com/'], check=False, capture_output=True)
    print('ogote.com ->', r.stdout)
    return r.stdout == '200'


def apply(new_text: str):
    old_text = LIVE.read_text()
    if new_text == old_text:
        print('proxy config unchanged')
        return
    test_candidate(new_text)
    backup = LIVE.with_name(f'nginx.proxy.conf.bak-portfolio-{time.strftime("%Y%m%dT%H%M%S")}')
    shutil.copy2(LIVE, backup)
    print('backup:', backup)
    # Write in place: the proxy bind-mounts this single file, so the inode must not change.
    with open(LIVE, 'w') as f:
        f.write(new_text)
    try:
        run(COMPOSE + ['exec', '-T', 'proxy', 'nginx', '-t'])
        run(COMPOSE + ['exec', '-T', 'proxy', 'nginx', '-s', 'reload'])
        time.sleep(2)
        if not firebridge_ok():
            raise RuntimeError('FIREBRIDGE check failed after reload')
    except Exception as exc:  # restore and reload the previous config
        print('!! rolling back:', exc)
        with open(LIVE, 'w') as f:
            f.write(old_text)
        run(COMPOSE + ['exec', '-T', 'proxy', 'nginx', '-s', 'reload'], check=False)
        sys.exit(1)
    print('proxy reloaded')


def main():
    phase = sys.argv[1] if len(sys.argv) > 1 else ''
    if phase not in ('http', 'https'):
        sys.exit(__doc__)
    conf = LIVE.read_text()
    conf = insert_block(conf, (HERE / 'http.conf').read_text(), '# >>> portfolio: mohamedelkorchi.com (http)')
    apply(conf)
    if phase == 'https':
        if not CERT.exists():
            run(['certbot', 'certonly', '--non-interactive', '--agree-tos', '--register-unsafely-without-email',
                 '--webroot', '-w', '/var/www/letsencrypt', '--cert-name', DOMAIN, '-d', DOMAIN, '-d', f'www.{DOMAIN}'])
        conf = insert_block(LIVE.read_text(), (HERE / 'https.conf').read_text(), '# >>> portfolio: mohamedelkorchi.com (https)')
        apply(conf)


if __name__ == '__main__':
    main()
