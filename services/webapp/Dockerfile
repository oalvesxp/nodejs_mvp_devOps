FROM node:20.18.1-alpine AS BUILD_STAGE
WORKDIR /usr/app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

COPY --from=BUILD_STAGE /usr/app/dist /usr/share/nginx/html
