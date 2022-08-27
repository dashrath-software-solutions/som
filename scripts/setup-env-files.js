#!/usr/bin/env node

const fs = require("fs");

(async () => {
  const apps = ["api"];

  console.log("----------------------------------------");
  console.log("Pre-populating .env files from .example.env");

  for (const app of apps) {
    const exists = fs.existsSync(`${__dirname}/../apps/${app}/src/.env`);

    if (!exists) {
      console.log(`Populating ${app} with .env file`);
      fs.copyFileSync(
        `/workspace/packages/${app}/.env.example`,
        `/workspace/packages/${app}/.env`
      );
    }
  }

  console.log("Finished populating .env files");
  console.log("----------------------------------------");
})();
