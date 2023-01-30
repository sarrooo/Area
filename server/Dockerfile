FROM node:16-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm run setup-db
RUN rm -rf ./prisma/migrations

EXPOSE 8080

CMD ["npm", "start"]