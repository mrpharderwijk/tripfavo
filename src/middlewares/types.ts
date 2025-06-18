import { NextMiddlewareResult } from 'next/dist/server/web/types'
import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export type AuthenticatedNextMiddleware = (
  request: NextRequest & { auth: any },
  event: NextFetchEvent,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

export type AuthMiddlewareFactory = (
  middleware: NextMiddleware,
) => AuthenticatedNextMiddleware
