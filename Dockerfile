FROM node:14-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . /app
COPY .env.example /app/.env

RUN yarn build

CMD yarn start:prod