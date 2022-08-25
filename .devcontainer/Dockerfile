# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT=18-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends nginx

COPY .nginx/site /etc/nginx/sites-available/default
COPY .nginx/proxy_params /etc/nginx/proxy_params

RUN su node -c "npm install -g pnpm" \
  && sudo /etc/init.d/nginx restart


