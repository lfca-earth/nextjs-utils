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

export function getAllHeaders(req: NextApiRequest | NextRequest) {
  const value = isEdgeRequest(req)
    ? [...req.headers.entries()].reduce((acc, curr) => {
        acc[curr[0]] = curr[1]
        return acc
      }, {} as Record<string, string>)
    : req.headers

  return value || {}
}

export function getHeader(req: NextApiRequest | NextRequest, name: string) {
  const value = isEdgeRequest(req)
    ? req.headers.get(name)
    : req.headers[name.toLocaleLowerCase()]

  return typeof value === 'string' ? value : undefined
}

export async function getJsonBody(req: NextApiRequest | NextRequest) {
  const requestsWithoutBody = ['GET', 'HEAD', 'OPTIONS']
  if (req.method && requestsWithoutBody.includes(req.method)) return {}

  return isEdgeRequest(req) ? (await req.json()) || {} : req.body || {}
}

export function getQuery(req: NextApiRequest | NextRequest) {
  if (isEdgeRequest(req)) {
    const { searchParams } = new URL(req.url)
    return Object.fromEntries(searchParams)
  } else {
    return req.query
  }
}

export function createSetCorsHeaders(
  req: NextApiRequest | NextRequest,
  res: NextApiResponse | NextResponse
) {
  const origin = getHeader(req, 'Origin') || '*'
  const methods = 'GET,HEAD,PUT,PATCH,POST,DELETE'
  const header =
    getHeader(req, 'Access-Control-Request-Headers') || 'Content-Type'

  if (isEdgeRequest(req)) {
    const headers = new Headers()

    // Allow any origin
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Allow-Methods', methods)
    headers.set('Access-Control-Allow-Headers', header)

    return headers
  } else {
    const apiResponse = res as NextApiResponse
    apiResponse
      .setHeader('Access-Control-Allow-Origin', origin)
      .setHeader('Access-Control-Allow-Methods', methods)
      .setHeader('Access-Control-Allow-Headers', header)
  }
}
