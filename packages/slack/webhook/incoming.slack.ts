import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/webhook'

export default class Incoming {
  private _hook: IncomingWebhook

  set hook(wh: IncomingWebhook) {
    this._hook = wh
  }

  private _url: string

  set url(link: string) {
    this._url = link
  }

  private _message: IncomingWebhookSendArguments

  set message(msg: IncomingWebhookSendArguments) {
    this._message = msg
  }

  constructor(url: string) {
    this._url = url
    this._hook = this.setHook()
  }

  private setHook() {
    return new IncomingWebhook(this._url)
  }

  public async send(msg?: IncomingWebhookSendArguments) {
    if (msg) {
      this.message = msg
    }
    this._hook.send(this._message)
  }
}
