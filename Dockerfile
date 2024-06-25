FROM node:20-alpine AS base


FROM base AS deps

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn cache clean --force

RUN yarn install 

FROM base AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN yarn run build

FROM base AS Deploy

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

ENTRYPOINT [ "yarn","run","start" ]


