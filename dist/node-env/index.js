"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTest = exports.isProduction = exports.isDev = void 0;
function isDev() {
    return process.env.NODE_ENV === 'development';
}
exports.isDev = isDev;
function isProduction() {
    return process.env.NODE_ENV === 'production';
}
exports.isProduction = isProduction;
function isTest() {
    return process.env.NODE_ENV === 'test';
}
exports.isTest = isTest;
//# sourceMappingURL=index.js.map