import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
export declare enum Runtime {
    edge = "edge",
    nodejs = "nodejs"
}
export interface ValidatedNextApiRequest<B = unknown, Q = unknown> extends NextApiRequest {
    parsedBody: B;
    parsedQuery: Q;
}
export interface ValidatedNextRequest<B = unknown, Q = unknown> extends NextRequest {
    parsedBody: B;
    parsedQuery: Q;
}
export declare enum ValidationError {
    BAD_REQUEST = "Payload invalid",
    NOT_FOUND = "Not found",
    UNAUTHORIZED = "Unauthorized"
}
export type CallbackTypes<B, Q> = {
    edge: (req: ValidatedRequestTypes<B, Q>['edge'], res: NextResponse) => Promise<NextResponse | void> | NextResponse | void;
    nodejs: (req: ValidatedRequestTypes<B, Q>['nodejs'], res: NextApiResponse) => Promise<void> | void;
};
export type Test = {
    edge: (req: NextRequest, res: NextResponse) => Promise<NextResponse | void> | NextResponse | void;
    nodejs: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;
};
export type RequestTypes = {
    edge: NextRequest;
    nodejs: NextApiRequest;
};
export type ValidatedRequestTypes<B, Q> = {
    edge: ValidatedNextRequest<B, Q>;
    nodejs: ValidatedNextApiRequest<B, Q>;
};
export type ResponseTypes = {
    edge: NextResponse;
    nodejs: NextApiResponse;
};
export type ReturnTypes = {
    edge: NextResponse | void;
    nodejs: void;
};
