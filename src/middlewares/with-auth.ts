import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { getLocale } from 'next-intl/server'

import { routes } from '@/constants/routes'
import { defaultLocale } from '@/i18n/routing'
import { MiddlewareFactory } from '@/middlewares/types'
import { getRouteObjectByRouteName } from '@/utils/get-route'
import { getRouteNameByRoutePath } from '@/utils/get-route'

function containsDashboard(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/dashboard(\/.*)?$/
  return regex.test(value)
}

function containsAuth(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/auth(\/.*)?$/
  return regex.test(value)
}

function containsAccountSettingsOnly(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/account-settings$/
  return regex.test(value)
}

function containsHostOnly(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/host$/
  return regex.test(value)
}

function containsHostWithListingIdOnly(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/host\/[0-9]+$/
  return regex.test(value)
}

function containsProtectedRoute(value: string) {
  const currentRouteName = getRouteNameByRoutePath(value)
  const currentRouteObject = getRouteObjectByRouteName(currentRouteName)

  return !!currentRouteObject?.protected
}

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { nextUrl } = request
    const locale = await getLocale()

    // Check for auth token in cookies instead of using auth() directly
    const tokenKey = process.env.ENVIRONMENT?.startsWith('PRD')
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token'
    const token = request.cookies.get(tokenKey)?.value

    /**
     * Not logged in & Dashboard page -> Redirect to login
     */
    if (!token && containsProtectedRoute(nextUrl.pathname)) {
      const url =
        locale !== defaultLocale
          ? `/${locale}/${routes.auth?.path}${routes.auth?.children?.login.path}?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`
          : `${routes.auth?.path}${routes.auth?.children?.login.path}?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    /**
     * Logged in
     */
    if (token) {
      /**
       * Logged in & Auth page -> Redirect to dashboard
       */
      if (containsAuth(nextUrl.pathname)) {
        const callbackUrl = nextUrl.searchParams.get('callbackUrl')
        const url =
          locale !== defaultLocale
            ? `/${locale}${callbackUrl ? callbackUrl : routes.dashboard.path}`
            : `${callbackUrl ? callbackUrl : routes.dashboard.path}`
        return NextResponse.redirect(new URL(url, request.url))
      }

      /**
       * Logged in & Account Settings page -> Redirect to default child route
       */
      if (containsAccountSettingsOnly(nextUrl.pathname)) {
        const defaultRoute = routes.account?.children
          ? Object.values(routes.account.children).find((child) => !!child.default)
          : undefined
        const url =
          locale !== defaultLocale
            ? `/${locale}${routes.account.path}${defaultRoute?.path}`
            : `${routes.account.path}${defaultRoute?.path}`
        return NextResponse.redirect(new URL(url, request.url))
      }

      /**
       * Logged in & Host
       */
      if (containsHostOnly(nextUrl.pathname)) {
        const defaultRoute = routes.host?.children
          ? Object.values(routes.host.children).find((child) => !!child.default)
          : undefined
        const url =
          locale !== defaultLocale
            ? `/${locale}${routes.host.path}${defaultRoute?.path}`
            : `${routes.host.path}${defaultRoute?.path}`
        return NextResponse.redirect(new URL(url, request.url))
      }
    }

    return next(request, _next)
  }
}
