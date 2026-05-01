# syntax=docker/dockerfile:1.7

# ---------- Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

# Install deps with cache-friendly layer
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Build-time secrets (Nuxt UI Pro license is required to build)
ARG NUXT_UI_PRO_LICENSE=""
ENV NUXT_UI_PRO_LICENSE=$NUXT_UI_PRO_LICENSE

ARG NUXT_PUBLIC_SITE_URL="https://gagnaire.dev"
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL

# Source + build (default Nitro preset = node-server)
COPY . .
RUN pnpm build

# ---------- Runtime ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Only the built output is needed
COPY --from=builder /app/.output ./.output

# Drop privileges
RUN addgroup -g 1001 -S nodejs \
 && adduser -S nuxt -u 1001 -G nodejs \
 && chown -R nuxt:nodejs /app
USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
