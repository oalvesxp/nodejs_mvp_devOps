FROM node:20.18.1-alpine AS build_stage
WORKDIR /usr/app

COPY package*.json .
RUN npm ci

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . .
RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

COPY --from=build_stage /usr/app/dist /usr/share/nginx/html
