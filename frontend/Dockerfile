FROM node:16-alpine

ENV CONTAINER_HOME=/var/www

WORKDIR $CONTAINER_HOME

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV CHOKIDAR_USEPOLLING=true
