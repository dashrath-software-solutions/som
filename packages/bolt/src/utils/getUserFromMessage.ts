import { KnownEventFromType } from '@slack/bolt/dist/types/index';
export const userFromMessage = (message: KnownEventFromType<'message'>) => {
  const msg: any = message;
  return `<@${msg.user}>`;
};
