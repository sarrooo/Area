FROM node:16-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 8080
EXPOSE 8443

CMD npm run start