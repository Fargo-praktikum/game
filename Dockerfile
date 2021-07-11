FROM node:13.12.0-alpine as build
WORKDIR /server
COPY . .

EXPOSE 5000

RUN npm install
RUN npm run build-dev

CMD npx sequelize db:migrate --url postgresql://postgres:newPassword@postgres:5432/fargo-cards ; node serverDist/server.js
