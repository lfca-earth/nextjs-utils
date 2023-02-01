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
exports.createCorsResponse = exports.getQuery = exports.getJsonBody = exports.getHeader = exports.createJsonResponse = exports.isEdgeRequest = void 0;
const server_1 = require("next/server");
function isEdgeRequest(req) {
    return !('query' in req);
}
exports.isEdgeRequest = isEdgeRequest;
function createJsonResponse(res, { json, status, }) {
    if ('send' in res) {
        return res.status(status).send(json);
    }
    return server_1.NextResponse.json(json, {
        status,
    });
}
exports.createJsonResponse = createJsonResponse;
function getHeader(req, name) {
    console.log('req.headers', req.headers);
    const value = isEdgeRequest(req)
        ? req.headers.get(name)
        : req.headers[name.toLocaleLowerCase()];
    return typeof value === 'string' ? value : undefined;
}
exports.getHeader = getHeader;
function getJsonBody(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return isEdgeRequest(req) ? yield req.json() : req.body;
    });
}
exports.getJsonBody = getJsonBody;
function getQuery(req) {
    if (isEdgeRequest(req)) {
        const { searchParams } = new URL(req.url);
        return Object.fromEntries(searchParams);
    }
    else {
        return req.query;
    }
}
exports.getQuery = getQuery;
function createCorsResponse(req, res) {
    const origin = getHeader(req, 'Origin') || '*';
    const methods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const header = getHeader(req, 'Access-Control-Request-Headers') || 'Content-Type';
    if (isEdgeRequest(req)) {
        const headers = new Headers();
        // Allow any origin
        headers.set('Access-Control-Allow-Origin', origin);
        headers.set('Access-Control-Allow-Methods', methods);
        headers.set('Access-Control-Allow-Headers', header);
        return new Response(null, { headers, status: 204 });
    }
    else {
        return res
            .status(204)
            .setHeader('Access-Control-Allow-Origin', origin)
            .setHeader('Access-Control-Allow-Methods', methods)
            .setHeader('Access-Control-Allow-Headers', header)
            .send(null);
    }
}
exports.createCorsResponse = createCorsResponse;
//# sourceMappingURL=helpers.js.map