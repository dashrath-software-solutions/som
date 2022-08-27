# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT=18-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN apt-get update \
  && export DEBIAN_FRONTEND=noninteractive \
  && export TZ=Asia/Kolkata \
  && apt-get -y install --no-install-recommends nginx vim git libzip-dev unzip fzf software-properties-common \
  && apt-get install -y openssl \
  && apt-get -y install tzdata \
  && su node -c "npm install -g pnpm"