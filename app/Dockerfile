FROM node:alpine

WORKDIR /src

COPY ./package.json .
RUN npm install
COPY ./src/ .

EXPOSE 3333

CMD ["node", "./src/server.js"]