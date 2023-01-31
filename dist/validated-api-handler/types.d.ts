import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
export declare enum ValidationError {
    BAD_REQUEST = "Payload invalid",
    NOT_FOUND = "Not found",
    UNAUTHORIZED = "Unauthorized"
}
export type RequestTypes = {
    edge: NextRequest;
    nodejs: NextApiRequest;
};
export type ResponseTypes = {
    edge: NextResponse;
    nodejs: NextApiResponse;
};
export type ReturnTypes = {
    edge: NextResponse | void;
    nodejs: void;
};
