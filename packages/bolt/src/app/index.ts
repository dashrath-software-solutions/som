import { App } from '@slack/bolt';
import { wave, updateTask } from '../message';
import { loadLegacyEnv, getEnv } from '../../../../libs/env/lib/main';
import { Task, taskSubmit } from '../interactive/task';
// import { interactiveEnums } from 'interactive';

loadLegacyEnv();

export const serverPort = getEnv('SLACK_SERVER_BOT_PORT', '8674');

const app = new App({
  processBeforeResponse: true,
  token: getEnv('SLACK_BOT_TOKEN'),
  signingSecret: getEnv('SLACK_SIGNING_SECRET'),
  socketMode: true,
  appToken: getEnv('SLACK_APP_TOKEN'),
  port: parseInt(serverPort),
});

app.use(async ({ body, client, ack, next }) => {
  if (
    body.type === 'dialog_submission' &&
    body.callback_id === taskSubmit.message
  ) {
    const handle = taskSubmit.handler();
    await handle(body, client, ack);
    return;
  }

  console.log('middleware', body);

  return await next();
});

async function noBotMessages({ message, next }) {
  if (!message.subtype || message.subtype !== 'bot_message') {
    await next();
  }
}

// The listener only receives messages from humans
app.message(noBotMessages, async ({ message, logger }: any) =>
  logger.info(`\n(MSG)\nUser: ${message.user}\nMessage: ${message.text}`),
);

app.message(wave.message, async ({ message, say }) => {
  const handle = wave.handler();
  await handle(message, say);
});

app.message(updateTask.message, async (list) => {
  const handle = updateTask.handler();
  await handle(list.message, list.say);
});

// slash commands

app.command(Task.message, async (list) => {
  const handle = Task.handler();
  await handle(list.body, list.client, list.ack);
});

// app.action(workingHourAction.message, async (list) => {
//   const handle = workingHourAction.handler();
//   await handle(list.body, list.client, list.ack);
// });

export default app;
