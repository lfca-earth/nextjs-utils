import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export function isEdgeRequest(
  req: NextApiRequest | NextRequest
): req is NextRequest {
  return !('query' in req)
}

export function createJsonResponse(
  res: NextApiResponse | NextResponse,
  {
    json,
    status,
  }: {
    status: number
    json: Record<string | number, string | number>
  }
) {
  if ('send' in res) {
    return res.status(status).send(json)
  }

  return NextResponse.json(json, {
    status,
  })
}

export function getHeader(req: NextApiRequest | NextRequest, name: string) {
  const value = isEdgeRequest(req) ? req.headers.get(name) : req.headers[name]

  return typeof value === 'string' ? value : undefined
}

export async function getJsonBody(req: NextApiRequest | NextRequest) {
  return isEdgeRequest(req) ? await req.json() : req.body
}

export function getQuery(req: NextApiRequest | NextRequest) {
  if (isEdgeRequest(req)) {
    const { searchParams } = new URL(req.url)
    return Object.fromEntries(searchParams)
  } else {
    return req.query
  }
}

export function runMiddleware(
  req: NextApiRequest | NextRequest,
  res: NextApiResponse | NextResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
