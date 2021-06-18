FROM node:13.12.0-alpine as build
WORKDIR /server
COPY . .
RUN npm install
RUN npm run build-dev

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
