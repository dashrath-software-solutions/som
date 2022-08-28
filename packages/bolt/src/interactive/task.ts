import {
  SlackActionMiddlewareArgs,
  SlackViewMiddlewareArgs,
} from '@slack/bolt';
import { SlackCommandMiddlewareArgs } from '@slack/bolt/dist/types/command/index';
import { WebClient } from '@slack/web-api';
import { interactiveEnums } from './index';

export const Task = {
  message: interactiveEnums.TASK_UPDATE,
  handler: () => {
    return async (
      body: SlackCommandMiddlewareArgs['body'],
      client: WebClient,
      ack: SlackCommandMiddlewareArgs['ack'],
    ) => {
      await ack();
      client.dialog.open({
        trigger_id: body.trigger_id,
        dialog: {
          title: 'Add your task',
          callback_id: interactiveEnums.TASK_VIEW_SUBMIT,
          notify_on_cancel: false,
          elements: [
            {
              type: 'textarea',
              name: 'taday_task',
              placeholder: 'Place you daily task in detail form.',
              label: 'Enter your task here in detail form.',
              min_length: 40,
              max_length: 3000,
            },
            {
              type: 'text',
              name: 'hours_spend',
              subtype: 'number',
              label: 'How much hours did you spend on above tasks.',
              value: '8',
            },
          ],
        },
      });
    };
  },
};

export const taskSubmit = {
  message: interactiveEnums.TASK_VIEW_SUBMIT,
  handler: () => {
    return async (
      body: SlackActionMiddlewareArgs['body'],
      client: WebClient,
      ack: any,
    ) => {
      await ack();
      console.log('one time only', body);
    };
  },
};
