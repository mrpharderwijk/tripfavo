import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { getLocale } from 'next-intl/server'

import { routes } from '@/constants/routes'
import { defaultLocale } from '@/i18n/routing'
import { MiddlewareFactory } from '@/middlewares/types'

function containsDashboard(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/dashboard(\/.*)?$/
  return regex.test(value)
}

function containsAuth(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/auth(\/.*)?$/
  return regex.test(value)
}

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { nextUrl } = request
    const locale = await getLocale()

    // Check for auth token in cookies instead of using auth() directly
    const token = request.cookies.get('next-auth.session-token')?.value

    if (!token && containsDashboard(nextUrl.pathname)) {
      const url =
        locale !== defaultLocale
          ? `/${locale}/${routes.login.path}?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`
          : `/${routes.login.path}?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    if (token && !containsDashboard(nextUrl.pathname)) {
      const url = locale !== defaultLocale ? `/${locale}/dashboard` : `/dashboard`
      return NextResponse.redirect(new URL(url, request.url))
    }

    return next(request, _next)
  }
}
