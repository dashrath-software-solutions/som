"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const Prisma_1 = __importDefault(require("../utils/Prisma"));
class AppProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
    }
    async boot() {
    }
    async ready() {
        await Prisma_1.default.$connect();
        Logger_1.default.info('App is ready.');
    }
    async shutdown() {
        await Prisma_1.default.$disconnect();
        Logger_1.default.error('App is going down. (.)(.)');
    }
}
exports.default = AppProvider;
//# sourceMappingURL=AppProvider.js.map