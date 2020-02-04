FROM node:10.13-alpine as angular
WORKDIR /app
COPY package.json /app/
RUN npm install --silent
COPY . .
ARG env=prod
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/crudpessoas-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t crudpessoas-app
