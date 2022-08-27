import { TasksFilteredListApiClickUp } from '../../../../../packages/click-up/tasks/TasksFilteredListApiClickUp'
describe('Tasks Filtered negative', () => {
  let task : TasksFilteredListApiClickUp
  const url = new URL(String(process.env.CLICK_UP_URL))
  const token = String(process.env.CLICK_UP_TOKEN)
  const teamId = Number(process.env.CLICK_UP_TEAM) + 3
  const space = String(process.env.CLICK_UP_SPACE).split(',')
  const list = String(process.env.CLICK_UP_LIST).split(',')
  const status = String(process.env.CLICK_UP_STATUS).split(',')

  beforeEach(() => {
    task = new TasksFilteredListApiClickUp(url, token, teamId)
  })

  it('Task list should throw error', async () => {
    task.params.order_by = 'updated'
    task.params.subtasks = true
    task.params.space_ids= space
    task.params.list_ids = list
    task.params.statuses = status
    await expect(task.execute()).rejects.toThrowError('Having error ends with status ERR_BAD_REQUEST')
  })
})
