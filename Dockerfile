FROM node:18-slim as BASE
WORKDIR /app
COPY . .
RUN apt update \
  && apt-get -y install tzdata \
  && npm i --global @adonisjs/cli \
  && apt-get install -y openssl \
  && rm -rf node_modules \
  && npm install \
  && npx prisma generate \
  && npm run build

ENV TZ=Asia/Kolkata
ENV DEBIAN_FRONTEND=noninteractive
CMD ["npm", "run", "debug"]


FROM node:18-slim as PRODUCTION
WORKDIR /app
COPY . .
RUN apt update \
  && apt-get -y install tzdata \
  && npm i --global @adonisjs/cli \
  && apt-get install -y openssl \
  && rm -rf node_modules \
  && npm install \
  && npx prisma generate \
  && npm run build

ENV TZ=Asia/Kolkata
ENV DEBIAN_FRONTEND=noninteractive

CMD ["npm", "run", "debug"]
