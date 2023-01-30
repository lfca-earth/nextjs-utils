export var Runtime;
(function (Runtime) {
    Runtime["edge"] = "edge";
    Runtime["nodejs"] = "nodejs";
})(Runtime || (Runtime = {}));
export var ValidationError;
(function (ValidationError) {
    ValidationError["BAD_REQUEST"] = "Payload invalid";
    ValidationError["NOT_FOUND"] = "Not found";
    ValidationError["UNAUTHORIZED"] = "Unauthorized";
})(ValidationError || (ValidationError = {}));
