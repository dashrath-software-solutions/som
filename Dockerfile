FROM node:18-slim as BASE

WORKDIR /app

COPY . .

RUN apt update \
  && apt-get -y install tzdata \
  && npm i --global @adonisjs/cli \
  && npm install npm run build

ENV TZ=Asia/Kolkata
ENV DEBIAN_FRONTEND=noninteractive


CMD ["npm", "run", "debug"]

FROM node:18-slim as PRODUCTION

WORKDIR /app

COPY . .


RUN apt update \
  && apt-get -y install tzdata \
  && npm install -g pino-datadog \
  && npm install npm run build


ENV TZ=Asia/Kolkata
ENV DEBIAN_FRONTEND=noninteractive



CMD ["npm", "run", "debug"]
