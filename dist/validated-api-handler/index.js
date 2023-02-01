"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedApiHandler = void 0;
const superstruct_1 = require("superstruct");
const logger_1 = require("../logger");
const helpers_1 = require("./helpers");
const types_1 = require("./types");
const validatedApiHandler = (callback, { authenticated, bodySchema, enableCors, method, querySchema, }) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logger = (0, logger_1.createLogger)(req.url || 'unknown/path');
    console.info('method', req.method);
    // Enable CORS if requested
    if (req.method === 'OPTIONS' && enableCors) {
        return (0, helpers_1.createCorsResponse)(req, res);
    }
    // Validate method
    if (req.method !== method) {
        logger.error(`Invalid method: ${req.method}`);
        return (0, helpers_1.createJsonResponse)(res, {
            json: { message: types_1.ValidationError.NOT_FOUND },
            status: 404,
        });
    }
    // Validate authorization
    if (authenticated) {
        const token = (_a = (0, helpers_1.getHeader)(req, 'authorization')) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1];
        if (token !== process.env.API_AUTH_TOKEN) {
            logger.error(types_1.ValidationError.UNAUTHORIZED);
            return (0, helpers_1.createJsonResponse)(res, {
                json: { message: types_1.ValidationError.UNAUTHORIZED },
                status: 401,
            });
        }
    }
    // Validate body & query
    try {
        const parsedBody = bodySchema ? yield (0, helpers_1.getJsonBody)(req) : undefined;
        if (bodySchema) {
            (0, superstruct_1.assert)(parsedBody, bodySchema);
        }
        const parsedQuery = querySchema ? (0, helpers_1.getQuery)(req) : undefined;
        if (querySchema) {
            (0, superstruct_1.assert)(parsedQuery, querySchema);
        }
        return callback(req, res, {
            body: parsedBody,
            query: parsedQuery,
        }, logger);
    }
    catch (e) {
        logger.error(`Invalid input: ${JSON.stringify(req.body || {})}`, e);
        return (0, helpers_1.createJsonResponse)(res, {
            json: { message: types_1.ValidationError.BAD_REQUEST },
            status: 400,
        });
    }
});
exports.validatedApiHandler = validatedApiHandler;
//# sourceMappingURL=index.js.map