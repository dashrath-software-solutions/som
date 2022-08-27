import { App } from '@slack/bolt';
import { loadLegacyEnv, getEnv } from '../../../../libs/env/lib/main';
import { logger } from '../../../../libs/logger/lib/main';

loadLegacyEnv();

export const serverPort = getEnv('SLACK_SERVER_BOT_PORT', '8674');

const app = new App({
  logger: logger,
  processBeforeResponse: true,
  token: getEnv('SLACK_BOT_TOKEN'),
  signingSecret: getEnv('SLACK_SIGNING_SECRET'),
  socketMode: true,
  appToken: getEnv('SLACK_APP_TOKEN'),
  port: parseInt(serverPort),
});

app.message(':wave:', async ({ message, say }) => {
  const msg = message as unknown as any;
  logger.log(msg);
  await say(`Hello <@${msg.user as string}>`);
});

export default app;
