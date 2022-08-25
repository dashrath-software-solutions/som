"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
class LogRequest {
    async handle({ request }, next) {
        let body = request.body();
        if (typeof body === 'object') {
            body = JSON.stringify(body);
        }
        const data = `${request.method()} : ${request.url()} \n Headers => ${JSON.stringify(request.headers())} \n Body => %o`;
        Logger_1.default.info(data, request.body());
        return await next();
    }
}
exports.default = LogRequest;
//# sourceMappingURL=LogRequest.js.map