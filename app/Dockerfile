FROM node:alpine

WORKDIR /src

COPY ./package.json .
RUN npm install
COPY ./src ./src

EXPOSE 3333

CMD ["npm", "run", "start"]