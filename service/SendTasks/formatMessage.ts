import { MappedClickUpTasks } from './FetchTasksFromClickUpSendItToSlack.service'

export const formatMessage = (data: Map<string, MappedClickUpTasks[]>) => {
  const keys = [...data.keys()]
  const message: any = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `These are the following task are in ${keys
          .map((val) => `*${val.toUpperCase()}*`)
          .join(', ')} for you. :office_worker:`,
      },
    },
  ]

  keys.forEach((val) => {
    const tasks = data.get(val)
    if (tasks && tasks.length > 0) {
      tasks.forEach((va, k) => {
        if (k === 0) {
          message.push(
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*${va.type.toUpperCase()}*`,
              },
            },
            {
              type: 'divider',
            }
          )
        }

        const vaAs = va.assignees
          ? {
              type: 'plain_text',
              emoji: true,
              text: va.assignees,
            }
          : {
              type: 'plain_text',
              emoji: true,
              text: 'No assignees',
            }

        message.push(
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                `*<https://app.clickup.com/t/${va.id}|${va.title}>* \n\n\n` +
                '```' +
                va.describe +
                '```',
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'plain_text',
                emoji: true,
                text: va.creator,
              },
              {
                type: 'plain_text',
                emoji: true,
                text: va.created,
              },
              vaAs,
            ],
          }
        )
      })
    }
  })

  console.log(JSON.stringify(message))
  return message
}
