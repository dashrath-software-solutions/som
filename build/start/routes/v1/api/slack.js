"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const EventsController_1 = __importDefault(require("../../../../app/Controllers/Http/Slack/EventsController"));
const InteractiveController_1 = __importDefault(require("../../../../app/Controllers/Http/Slack/InteractiveController"));
const SlashCommandsController_1 = __importDefault(require("../../../../app/Controllers/Http/Slack/SlashCommandsController"));
const eventsController = new EventsController_1.default();
const interectiveController = new InteractiveController_1.default();
const slashCommandsController = new SlashCommandsController_1.default();
Route_1.default.group(() => {
    Route_1.default.group(() => {
        Route_1.default.post('challenge', eventsController.challenge);
    }).prefix('events');
    Route_1.default.group(() => {
        Route_1.default.post('method', interectiveController.method);
    }).prefix('interective');
    Route_1.default.group(() => {
        Route_1.default.post('meet', slashCommandsController.meet);
    }).prefix('commands');
}).prefix('v1/api/slack');
//# sourceMappingURL=slack.js.map