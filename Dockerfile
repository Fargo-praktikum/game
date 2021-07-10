FROM node:13.12.0-alpine as build

WORKDIR /server

COPY ./package*.json .

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build-heroku

ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["echo", "!!!!!!!! psql-container is available now !!!!!!!!"] && node serverDist/index.js
