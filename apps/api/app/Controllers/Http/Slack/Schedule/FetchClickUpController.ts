import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BaseController } from '../../../BaseController'
import { FetchTasksFromClickUpSendItToSlackService } from '../../../../../service/SendTasks/FetchTasksFromClickUpSendItToSlack.service'

export default class FetchClickUpController extends BaseController {
  private _service: FetchTasksFromClickUpSendItToSlackService

  constructor() {
    super()
    this._service = new FetchTasksFromClickUpSendItToSlackService()
  }

  /**
   * It will fetch click-up tasks and redirects to the slack.
   * @param ctx HttpContextContract
   * @returns any
   */
  public async getTaskAndRedirectToTheSlack(ctx: HttpContextContract) {
    this._service = new FetchTasksFromClickUpSendItToSlackService()
    return await this._service.handle()
  }
}
