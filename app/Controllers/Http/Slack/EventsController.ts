import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EventsController {
  /**
   * When ever users send a message in the channel it will get called.
   * @param ctx HttpContextContract
   * @returns any
   */
  public async challenge(ctx: HttpContextContract) {
    return ctx.request.body()
  }
}
