import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
export declare function isEdgeRequest(req: NextApiRequest | NextRequest): req is NextRequest;
export declare function createJsonResponse(res: NextApiResponse | NextResponse, { json, status, }: {
    status: number;
    json: Record<string | number, string | number>;
}): void | NextResponse;
export declare function getHeader(req: NextApiRequest | NextRequest, name: string): string | undefined;
export declare function getJsonBody(req: NextApiRequest | NextRequest): Promise<any>;
export declare function getQuery(req: NextApiRequest | NextRequest): Partial<{
    [key: string]: string | string[];
}>;
