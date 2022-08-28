import { KnownEventFromType, SayFn } from '@slack/bolt/dist/types/index';
import { userFromMessage } from '../utils/getUserFromMessage';
import { MessagesEnums } from './enums';

export const updateTask = {
  message: MessagesEnums.UPDATE_TASK,
  handler: () => {
    return async (
      message: KnownEventFromType<'message'>,
      say: SayFn,
    ): Promise<void> => {
      say(`Sure, ${userFromMessage(message)}`);
    };
  },
};
