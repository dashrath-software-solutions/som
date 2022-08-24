import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BaseController } from '../../BaseController'

export default class EventsController extends BaseController {
  /**
   * When ever users send a message in the channel it will get called.
   * @param ctx HttpContextContract
   * @returns any
   */
  public async challenge(ctx: HttpContextContract) {
    return ctx.request.body()
  }
}
