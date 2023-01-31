import { NextResponse } from 'next/server';
import { Struct } from 'superstruct';
import { Logger } from '../logger';
import { RequestTypes, ResponseTypes, ReturnTypes } from './types';
export declare const validatedApiHandler: <R extends keyof RequestTypes, BT, BS, QT, QS>(callback: (req: RequestTypes[R], res: ResponseTypes[R], parsed: {
    body: BT;
    query: QT;
}, logger: Logger) => ReturnTypes[R] | Promise<ReturnTypes[R]>, { authenticated, bodySchema, method, querySchema, }: {
    authenticated: boolean;
    bodySchema?: Struct<BT, BS | null> | undefined;
    method: string;
    querySchema?: Struct<QT, QS | null> | undefined;
    runtime: R;
}) => (req: RequestTypes[R], res: ResponseTypes[R]) => Promise<NextResponse | void>;
