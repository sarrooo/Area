FROM node:19.4.0-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8081