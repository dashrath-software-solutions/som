import { KnownEventFromType, SayFn } from '@slack/bolt/dist/types/index';
import { userFromMessage } from '../utils/getUserFromMessage';
import { MessagesEnums } from './enums';

export const wave = {
  message: MessagesEnums.WAVE,
  handler: () => {
    return async (
      message: KnownEventFromType<'message'>,
      say: SayFn,
    ): Promise<void> => {
      await say(`Hello, ${userFromMessage(message)}\nHow can i help you?`);
    };
  },
};
