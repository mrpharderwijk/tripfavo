import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

import { MiddlewareFactory } from '@/middlewares/types'

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const response = await next(request, _next)
    if (response) {
      response.headers.set('x-content-type-options', 'nosniff')
      response.headers.set('x-dns-prefetch-control', 'false')
      response.headers.set('x-download-options', 'noopen')
      response.headers.set('x-frame-options', 'SAMEORIGIN')
    }
    return response
  }
}
