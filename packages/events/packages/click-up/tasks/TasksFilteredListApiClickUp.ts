import { AxiosError } from 'axios'
import { AxiosBase } from '../../../utils/AxiosBase'
import { ClickUpRequestSuccessFilteredTasksList, IFileteredTeamTasks } from '../interface'

export class TasksFilteredListApiClickUpError extends Error {
  constructor(message?: string) {
    super(message)
  }
}

export class TasksFilteredListApiClickUp extends AxiosBase {
  private _teamId: number

  private _endpoint: string

  public params: IFileteredTeamTasks = {}

  get teamId() {
    return this._teamId
  }

  constructor(url: URL, auth: string, team_id: number) {
    super(url, auth)
    this._teamId = team_id
    this._endpoint = this.configureEndpoint()
  }

  private configureEndpoint() {
    return `team/${this._teamId}/task`
  }

  public async execute(): Promise<ClickUpRequestSuccessFilteredTasksList> {
    try {
      const { data } = await this.client.get<ClickUpRequestSuccessFilteredTasksList>(
        this._endpoint,
        {
          params: this.params,
        }
      )
      return data
    } catch (e) {
      const err = e as AxiosError
      throw new TasksFilteredListApiClickUpError('Having error ends with status ' + err.code)
    }
  }
}
