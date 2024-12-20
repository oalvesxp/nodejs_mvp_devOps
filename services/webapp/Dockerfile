FROM node:20.18.1-alpine AS PRODUCTION
WORKDIR /app 

COPY package.json . 
RUN npm install 
COPY . . 
RUN npm run build 

EXPOSE 80

CMD [ "npm", "run", "preview" ]
