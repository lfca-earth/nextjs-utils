import { NextResponse } from 'next/server'
import { assert, Struct } from 'superstruct'

import { createLogger, Logger } from '../logger'
import { createJsonResponse, getHeader, getJsonBody, getQuery } from './helpers'
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
      parsed: {
        body: BT
        query: QT
      },
      logger: Logger
    ) => Promise<ReturnTypes[R]> | ReturnTypes[R],
    {
      authenticated,
      bodySchema,
      method,
      querySchema,
    }: {
      authenticated: boolean
      bodySchema?: Struct<BT, BS | null>
      method: string
      querySchema?: Struct<QT, QS | null>
      runtime: R
    }
  ) =>
  async (
    req: RequestTypes[R],
    res: ResponseTypes[R]
  ): Promise<NextResponse | void> => {
    const logger = createLogger(req.url || 'unknown/path')

    // Validate method
    if (req.method !== method) {
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
        {
          body: parsedBody,
          query: parsedQuery as QT,
        },
        logger
      )
    } catch (e) {
      logger.error(`Invalid input: ${JSON.stringify(req.body || {})}`, e)
      return createJsonResponse(res, {
        json: { message: ValidationError.BAD_REQUEST },
        status: 400,
      })
    }
  }
