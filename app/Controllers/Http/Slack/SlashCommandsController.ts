import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BaseController } from '../../BaseController'

export default class SlashCommandsController extends BaseController {
  /**
   * It will be called when user sends
   * @send /meeting-start
   * @param ctx HttpContextContract
   * @returns any
   */
  public async meet(ctx: HttpContextContract) {
    return ctx.request.body()
  }
}
