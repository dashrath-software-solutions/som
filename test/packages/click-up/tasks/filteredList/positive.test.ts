import { TasksFilteredListApiClickUp } from '../../../../../packages/click-up/tasks/TasksFilteredListApiClickUp'
describe('Tasks Filtered positive', () => {
  let task : TasksFilteredListApiClickUp
  const url = new URL(String(process.env.CLICK_UP_URL))
  const token = String(process.env.CLICK_UP_TOKEN)
  const teamId = Number(process.env.CLICK_UP_TEAM)
  const space = String(process.env.CLICK_UP_SPACE).split(',')
  const list = String(process.env.CLICK_UP_LIST).split(',')
  const status = String(process.env.CLICK_UP_STATUS).split(',')

  beforeEach(() => {
    task = new TasksFilteredListApiClickUp(url, token, teamId)
  })

  it('should returns axios instance', () => {
    expect(task.client).toBeDefined()
  })

  it('Task list should returns', async () => {
    task.params.order_by = 'updated'
    task.params.subtasks = true
    task.params.space_ids= space
    task.params.list_ids = list
    task.params.statuses = status
    const data = await task.execute()
    expect(data).toBeTruthy()
    expect(data.tasks).toBeDefined()
    expect(task.teamId).toBeDefined()
  })
})
