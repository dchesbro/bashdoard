FROM node:20.9.0-alpine AS base

# install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm i; \
  else \
    echo "Lockfile not found." && exit 1; \
  fi

# build
FROM base AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# run server
FROM base AS runtime

WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD node .next/standalone/server.js