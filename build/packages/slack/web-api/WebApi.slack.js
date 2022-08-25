"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_api_1 = require("@slack/web-api");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class SlackWebApi {
    constructor() {
        this._client = new web_api_1.WebClient(Env_1.default.get('USER_AUTH_TOKEN'), {
            logLevel: web_api_1.LogLevel.DEBUG,
        });
    }
    set client(cli) {
        this._client = cli;
    }
    get client() {
        return this._client;
    }
}
exports.default = SlackWebApi;
//# sourceMappingURL=WebApi.slack.js.map