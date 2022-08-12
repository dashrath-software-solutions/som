import { WebClient, LogLevel } from '@slack/web-api'
import Env from '@ioc:Adonis/Core/Env'

export default class SlackWebApi {
  private _client: WebClient

  set client(cli: WebClient) {
    this._client = cli
  }

  get client() {
    return this._client
  }

  constructor() {
    this._client = new WebClient(Env.get('USER_AUTH_TOKEN'), {
      logLevel: LogLevel.DEBUG,
    })
  }
}
