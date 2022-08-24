import { BaseService } from '../BaseService'
import { TasksFilteredListApiClickUp } from '../../packages/click-up/tasks/TasksFilteredListApiClickUp'
import { TaskPriority, TasksList } from '../../packages/click-up/interface'
import { groupBy } from '../../utils/GroupBy'
import { SlackWebApi } from '../../packages/slack/web-api/WebApi.slack'
import { formatMessage } from './formatMessage'

export interface MappedClickUpTasks {
  id: string
  prio: TaskPriority
  type: string
  title: string
  describe: string
  assignees: string
  created: string
  creator: string
}

export class FetchTasksFromClickUpSendItToSlackService extends BaseService {
  constructor() {
    super()
  }

  private mapTheWholeTasks(tasks: TasksList[]): MappedClickUpTasks[] {
    return tasks
      .map((value) => {
        let prio = value.priority

        if (!prio) {
          prio = {
            id: 3,
            priority: 'normal',
            color: '#6fddff',
            orderindex: '3',
          }
        }

        return {
          id: value.id,
          prio: prio,
          type: value.status.status,
          title: value.name,
          describe: value.description,
          assignees: value.assignees.map((asn) => asn.username).join(', '),
          created: value.date_created,
          creator: value.creator.username,
        }
      })
      .sort((a, b) => Number(a.prio.orderindex) - Number(b.prio.orderindex))
  }

  private async getClickUpTasks() {
    const url = new URL(String(this._settings.getSetting('CLICK_UP_URL')))
    const token = String(this._settings.getSetting('CLICK_UP_TOKEN'))
    const teamId = Number(this._settings.getSetting('CLICK_UP_TEAM'))
    const space = String(this._settings.getSetting('CLICK_UP_SPACE')).split(',')
    const list = String(this._settings.getSetting('CLICK_UP_LIST')).split(',')
    const status = String(this._settings.getSetting('CLICK_UP_STATUS')).split(',')

    const task = new TasksFilteredListApiClickUp(url, token, teamId)
    task.params.order_by = 'updated'
    task.params.subtasks = true
    task.params.space_ids = space
    task.params.list_ids = list
    task.params.statuses = status
    const data = await task.execute()
    return data.tasks
  }

  private groupItViaType(tasks: MappedClickUpTasks[]) {
    const groupedData = groupBy(tasks, (task) => task.type)
    return groupedData
  }

  private async getMappedCLickUpTasks() {
    const tasks = await this.getClickUpTasks()
    const mapTask = this.mapTheWholeTasks(tasks)
    const group = this.groupItViaType(mapTask)
    return group
  }

  private createSlackBotMessage(data: Map<string, MappedClickUpTasks[]>) {
    return formatMessage(data)
  }

  private async notifyInsideSlack(data: Map<string, MappedClickUpTasks[]>) {
    const slack = new SlackWebApi(String(this._settings.getSetting('SLACK_BOT_TOKEN')))
    slack.client.chat.postMessage({
      channel: this._settings.getSetting('SLACK_CHANNEL_ID'),
      blocks: this.createSlackBotMessage(data),
    })
  }

  public async handle() {
    const clickUpTask = await this.getMappedCLickUpTasks()
    await this.notifyInsideSlack(clickUpTask)
    return false
  }
}
