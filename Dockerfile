FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . .

EXPOSE 5000

RUN npm install
RUN npm run build-dev
