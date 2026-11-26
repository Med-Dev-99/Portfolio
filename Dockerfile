# Production image for mohamedelkorchi.com
#
#   docker build --build-arg GIT_SHA=$(git rev-parse HEAD) -t portfolio-site .
#   docker compose up --build            # local preview on http://localhost:8080
#
# Two stages: Node builds and type-checks the Astro site, then only the static files and the
# Nginx config are copied into a minimal Alpine + Nginx image that runs as a non-root user.
# Base images are pinned by digest; Dependabot proposes updates.

# ---------- build ----------
FROM node:24.22.1-alpine3.24@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1 \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false

# Dependencies first, so this layer is reused until package-lock.json changes.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit

COPY . .
ARG GIT_SHA=dev
# astro check + astro build; then a version marker for deploy verification, and gzip copies
# that Nginx serves directly (gzip_static). -n keeps the archives byte-for-byte reproducible.
RUN npm run build \
 && printf '%s\n' "$GIT_SHA" > dist/version.txt \
 && find dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.json' \
      -o -name '*.svg' -o -name '*.xml' -o -name '*.txt' \) -size +512c -exec gzip -9 -k -n {} +

# ---------- runtime ----------
# Alpine's own nginx package gets security fixes sooner than the official Nginx images
# (1.30.8 here, while nginx-unprivileged still ships 1.30.6 with critical CVEs).
# Only nginx and its few libraries are installed: no modules, no curl, no Node.
FROM alpine:3.24.4@sha256:f59abe656b692d901e184be3445e084786602108599d2a51d229c0f5a48c71bf AS runtime
ARG GIT_SHA=dev
LABEL org.opencontainers.image.title="mohamedelkorchi.com" \
      org.opencontainers.image.description="Portfolio of Mohamed El Korchi, AI & Data Engineer" \
      org.opencontainers.image.url="https://mohamedelkorchi.com" \
      org.opencontainers.image.source="https://github.com/Med-Dev-99/Portfolio" \
      org.opencontainers.image.revision="$GIT_SHA"

RUN apk upgrade --no-cache \
 && apk add --no-cache nginx \
 && rm -rf /var/cache/apk/* /etc/nginx/http.d

COPY deploy/nginx.conf /etc/nginx/nginx.conf
# Files stay owned by root: the nginx user can read them but never modify them.
COPY --from=build /app/dist /srv/site

USER nginx
EXPOSE 8080
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --start-interval=1s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
CMD ["nginx", "-e", "/dev/stderr", "-g", "daemon off;"]
