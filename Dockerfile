FROM node:18-alpine3.15 as BASE
WORKDIR /app
COPY . .
RUN npm install \
    && npm run build

CMD ["npm", "run", "debug"]





