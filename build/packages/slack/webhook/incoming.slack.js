"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webhook_1 = require("@slack/webhook");
class Incoming {
    constructor(url) {
        this._url = url;
        this._hook = this.setHook();
    }
    set hook(wh) {
        this._hook = wh;
    }
    set url(link) {
        this._url = link;
    }
    set message(msg) {
        this._message = msg;
    }
    setHook() {
        return new webhook_1.IncomingWebhook(this._url);
    }
    async send(msg) {
        if (msg) {
            this.message = msg;
        }
        this._hook.send(this._message);
    }
}
exports.default = Incoming;
//# sourceMappingURL=incoming.slack.js.map