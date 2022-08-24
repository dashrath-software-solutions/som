import { WebClient, LogLevel } from '@slack/web-api'

export class SlackWebApi {
  private _client: WebClient

  get client() {
    return this._client
  }

  constructor(token: string, level?: LogLevel) {
    this._client = new WebClient(token, {
      logLevel: level,
    })
  }
}
