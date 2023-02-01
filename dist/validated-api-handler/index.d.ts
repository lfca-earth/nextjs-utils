import { NextResponse } from 'next/server';
import { Struct } from 'superstruct';
import { Logger } from '../logger';
import { RequestTypes, ResponseTypes, ReturnTypes } from './types';
export declare const validatedApiHandler: <R extends keyof RequestTypes, BT, BS, QT, QS>(callback: (req: RequestTypes[R], res: ResponseTypes[R], logger: Logger, parsed: {
    body: BT;
    query: QT;
}, edgeCorsHeaders?: Headers) => ReturnTypes[R] | Promise<ReturnTypes[R]>, { authenticated, bodySchema, enableCors, method, querySchema, }: {
    authenticated: boolean;
    bodySchema?: Struct<BT, BS | null> | undefined;
    enableCors?: boolean | undefined;
    method: string;
    querySchema?: Struct<QT, QS | null> | undefined;
    runtime: R;
}) => (req: RequestTypes[R], res: ResponseTypes[R]) => Promise<NextResponse | Response | void>;
