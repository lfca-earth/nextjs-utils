import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { assert, Struct } from 'superstruct'

import { createLogger, Logger } from '../logger'
import {
  createJsonResponse,
  createSetCorsHeaders,
  getAllHeaders,
  getHeader,
  getJsonBody,
  getQuery,
  isEdgeRequest,
} from './helpers'
import {
  RequestTypes,
  ResponseTypes,
  ReturnTypes,
  ValidationError,
} from './types'

export const validatedApiHandler =
  <R extends keyof RequestTypes, BT, BS, QT, QS>(
    callback: (
      req: RequestTypes[R],
      res: ResponseTypes[R],
      logger: Logger,
      parsed: {
        body: BT
        query: QT
      },
      edgeCorsHeaders?: Headers
    ) => Promise<ReturnTypes[R]> | ReturnTypes[R],
    {
      authenticated,
      bodySchema,
      enableCors,
      method,
      querySchema,
    }: {
      authenticated: boolean
      bodySchema?: Struct<BT, BS | null>
      enableCors?: boolean
      method: string
      querySchema?: Struct<QT, QS | null>
      runtime: R
    }
  ) =>
  async (
    req: RequestTypes[R],
    res: ResponseTypes[R]
  ): Promise<NextResponse | Response | void> => {
    const logger = createLogger(req.url || 'unknown/path')

    // Handle CORS if requested
    const corsHeaders = enableCors ? createSetCorsHeaders(req, res) : undefined
    // Respond to OPTIONS call directly
    if (req.method === 'OPTIONS' && enableCors) {
      if (isEdgeRequest(req)) {
        return new Response(null, { headers: corsHeaders, status: 204 })
      } else {
        return (res as NextApiResponse).status(204).send(undefined)
      }
    }

    // Validate method
    if (req.method !== 'HEAD' && req.method !== method) {
      logger.error(`Invalid method: ${req.method}`)
      return createJsonResponse(res, {
        json: { message: ValidationError.NOT_FOUND },
        status: 404,
      })
    }

    // Validate authorization
    if (authenticated) {
      const token = getHeader(req, 'authorization')?.split('Bearer ')[1]
      if (token !== process.env.API_AUTH_TOKEN) {
        logger.error(ValidationError.UNAUTHORIZED)
        return createJsonResponse(res, {
          json: { message: ValidationError.UNAUTHORIZED },
          status: 401,
        })
      }
    }

    // Validate body & query
    try {
      const parsedBody = bodySchema ? await getJsonBody(req) : undefined
      if (bodySchema) {
        assert(parsedBody, bodySchema)
      }

      const parsedQuery = querySchema ? getQuery(req) : undefined
      if (querySchema) {
        assert(parsedQuery, querySchema)
      }

      return callback(
        req,
        res,
        logger,
        {
          body: parsedBody,
          query: parsedQuery as QT,
        },
        corsHeaders
      )
    } catch (e) {
      logger.error(
        `Invalid input
        \nbody: ${JSON.stringify(getJsonBody(req), null, 2)}
        \nheaders: ${JSON.stringify(getAllHeaders(req), null, 2)}
        \nerror:\n`,
        e
      )
      return createJsonResponse(res, {
        json: { message: ValidationError.BAD_REQUEST },
        status: 400,
      })
    }
  }
