"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLogger = exports.writeFile = exports.logFilePath = void 0;
const pino_1 = __importDefault(require("pino"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const Logger_1 = require("../node_modules/@adonisjs/logger/build/src/Logger");
const logFilePath = (suffix = '') => {
    const date = new Date();
    const addNewFolderNames = `${date.getFullYear()}/${date.getMonth() + 1}`;
    const abssolutePathFolder = path.resolve(__dirname, '..', 'logs', addNewFolderNames);
    const fileName = `${date.getDate()}${suffix}.log`;
    fs.mkdirSync(abssolutePathFolder, { recursive: true });
    const absolutePath = path.resolve(abssolutePathFolder, fileName);
    fs.appendFile(absolutePath, '', (err) => {
        if (err) {
            console.error(err.message, err);
            process.exit(1);
        }
    });
    return absolutePath;
};
exports.logFilePath = logFilePath;
const writeFile = (suffix = '') => fs.createWriteStream((0, exports.logFilePath)(suffix), {
    flags: 'a+',
    encoding: undefined,
    mode: 0o777,
});
exports.writeFile = writeFile;
exports.PinoLogger = (0, pino_1.default)({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
        destination: (0, exports.writeFile)('-global'),
    },
}, pino_1.default.destination((0, exports.writeFile)('-global-1')));
const logger = new Logger_1.Logger({
    name: 'sop',
    level: 'trace',
    enabled: false,
    stream: (0, exports.writeFile)('-global-2'),
}, exports.PinoLogger);
exports.default = logger;
//# sourceMappingURL=Logger.js.map