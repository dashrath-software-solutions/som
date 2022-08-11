FROM node:18-alpine3.15 as BASE
WORKDIR /app
COPY . .
RUN npm i --global @adonisjs/cli && npm install npm run build

CMD ["npm", "run", "debug"]

FROM node:18-alpine3.15 as PRODUCTION
WORKDIR /app
COPY . .
RUN npm install -g pino-datadog && npm install npm run build

CMD ["npm", "run", "debug"]
