import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InteractiveController {
  /**
   * When ever bot will interact with the user it will get called.
   * @param ctx HttpContextContract
   * @returns any
   */
  public async method(ctx: HttpContextContract) {
    return ctx.request.body()
  }
}
