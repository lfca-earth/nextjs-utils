"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.Runtime = void 0;
var Runtime;
(function (Runtime) {
    Runtime["edge"] = "edge";
    Runtime["nodejs"] = "nodejs";
})(Runtime = exports.Runtime || (exports.Runtime = {}));
var ValidationError;
(function (ValidationError) {
    ValidationError["BAD_REQUEST"] = "Payload invalid";
    ValidationError["NOT_FOUND"] = "Not found";
    ValidationError["UNAUTHORIZED"] = "Unauthorized";
})(ValidationError = exports.ValidationError || (exports.ValidationError = {}));
//# sourceMappingURL=types.js.map