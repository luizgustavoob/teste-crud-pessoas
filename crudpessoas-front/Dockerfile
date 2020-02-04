FROM node:10.13-alpine as angular
WORKDIR /app
COPY package.json /app/
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
EXPOSE 80:80
COPY --from=angular app/dist/crudpessoas-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
