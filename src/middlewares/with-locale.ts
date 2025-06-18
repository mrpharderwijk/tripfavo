import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function withLocale(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // First handle the internationalization
    const response = intlMiddleware(request)

    // If there's a response from intl middleware, return it
    if (response) {
      return response
    }

    // Otherwise continue with the rest of the middleware stack
    return middleware(request, event)
  }
}
