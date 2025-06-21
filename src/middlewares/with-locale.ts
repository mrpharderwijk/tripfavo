import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export function withLocale(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Otherwise continue with the rest of the middleware stack
    return middleware(request, event)
  }
}
