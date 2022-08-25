"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./routes/v1/api/slack");
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const HealthCheck_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HealthCheck"));
Route_1.default.get('/', async () => {
    const date = new Date();
    return {
        date: date.toDateString(),
        time: date.toTimeString(),
        timezoneOffset: date.getTimezoneOffset(),
        timezone: process.env.TZ,
    };
});
Route_1.default.get('health', async ({ response }) => {
    const report = await HealthCheck_1.default.getReport();
    return report.healthy ? response.ok(report) : response.badRequest(report);
});
//# sourceMappingURL=routes.js.map