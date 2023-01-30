import { NextResponse } from 'next/server';
import { Struct } from 'superstruct';
import { RequestTypes, ResponseTypes, ReturnTypes, Test, ValidatedRequestTypes } from './types';
export declare const validatedApiHandler: <R extends keyof Test, BT, BS, QT, QS>(callback: (req: ValidatedRequestTypes<BT, QT>[R], res: ResponseTypes[R]) => ReturnTypes[R] | Promise<ReturnTypes[R]>, { authenticated, bodySchema, method, querySchema, }: {
    authenticated: boolean;
    bodySchema?: Struct<BT, BS | null> | undefined;
    method: string;
    querySchema?: Struct<QT, QS | null> | undefined;
    runtime: R;
}) => (req: RequestTypes[R], res: ResponseTypes[R]) => Promise<NextResponse | void>;
