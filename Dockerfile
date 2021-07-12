FROM node:13.12.0-alpine as build

WORKDIR /server

COPY ./package*.json .
RUN npm install

COPY . .

EXPOSE 5000

RUN npm run dev_heroku

CMD npx sequelize db:migrate --url postgresql://postgres:newPassword@postgres:5432/fargo-cards ; node serverDist/index.js
