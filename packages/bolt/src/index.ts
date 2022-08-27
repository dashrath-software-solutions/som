import app, { serverPort } from './app/index';

(async () => {
  await app.start(serverPort);
  console.log('⚡️ Bolt app is running!');
})();
