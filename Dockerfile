FROM node:18-alpine3.15 as BASE
WORKDIR /app
COPY . .
RUN apk add --no-cache tzdata && npm i --global @adonisjs/cli && npm install npm run build
ENV TZ=Asia/Kolkata

CMD ["npm", "run", "debug"]

FROM node:18-alpine3.15 as PRODUCTION
WORKDIR /app
COPY . .
RUN apk add --no-cache tzdata && npm install -g pino-datadog && npm install npm run build
ENV TZ=Asia/Kolkata

CMD ["npm", "run", "debug"]
