import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LogRequest {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let body: any = request.body()
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }

    const data = `${request.method()} : ${request.url()} \n Headers => ${JSON.stringify(
      request.headers()
    )} \n Body => %o`
    Logger.info(data, request.body())

    return await next()
  }
}
