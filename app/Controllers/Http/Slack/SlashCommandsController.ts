import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SlashCommandsController {
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
