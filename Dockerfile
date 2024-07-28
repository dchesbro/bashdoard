FROM node:20.9.0-alpine AS build

WORKDIR /app
COPY . .

RUN if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile --prod; \
  elif [ -f package-lock.json ]; then \
    npm ci --prod; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm i --prod; \
  else \
    echo "Lockfile not found." && exit 1; \
  fi && \
  npm run build

FROM node:20.9.0-alpine AS runtime 

WORKDIR /app
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD node ./server/entry.mjs