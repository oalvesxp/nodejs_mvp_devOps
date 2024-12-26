# production
FROM node:20.18.1-alpine AS production
WORKDIR /usr/node/app

RUN apk add --no-cache \
  openssl \
  libssl3 \
  libgcc \
  libc6-compat

COPY --chown=node:node package*.json ./
RUN npm ci --production

COPY --chown=node:node prisma ./prisma
RUN npx prisma generate

COPY --chown=node:node build/ /usr/node/app/build

ENV NODE_ENV=production

EXPOSE 3000
USER node

CMD [ "npm", "start" ]
