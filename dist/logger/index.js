"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.rootLogger = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
const loglevel_plugin_prefix_1 = __importDefault(require("loglevel-plugin-prefix"));
const node_env_1 = require("../node-env");
loglevel_plugin_prefix_1.default.reg(loglevel_1.default);
loglevel_plugin_prefix_1.default.apply(loglevel_1.default, {
    format(level, name) {
        return `[${level}] ${name}:`;
    },
});
if ((0, node_env_1.isProduction)()) {
    loglevel_1.default.setDefaultLevel(loglevel_1.default.levels.WARN);
}
else if ((0, node_env_1.isTest)()) {
    loglevel_1.default.setDefaultLevel(loglevel_1.default.levels.SILENT);
}
else if ((0, node_env_1.isDev)()) {
    loglevel_1.default.setDefaultLevel(loglevel_1.default.levels.TRACE);
}
else {
    loglevel_1.default.setDefaultLevel(loglevel_1.default.levels.INFO);
}
exports.rootLogger = loglevel_1.default;
exports.createLogger = loglevel_1.default.getLogger;
//# sourceMappingURL=index.js.map