import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { getLocale } from 'next-intl/server'
import { UserRole } from '@prisma/client'

import { routes } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { MiddlewareFactory } from '@/middlewares/types'
import { getRouteObjectByRouteName } from '@/utils/get-route'
import { getRouteNameByRoutePath } from '@/utils/get-route'

function containsAuth(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/auth(\/.*)?$/
  return regex.test(value)
}

function containsAccountSettingsOnly(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/account-settings$/
  return regex.test(value)
}

function containsHostOnly(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/host$/
  return regex.test(value)
}

function containsGuestOnly(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/guest$/
  return regex.test(value)
}

function containsHostWithPropertyIdOnly(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/host\/[0-9]+$/
  return regex.test(value)
}

function containsProtectedRoute(value: string): boolean {
  const currentRouteName = getRouteNameByRoutePath(value)
  const currentRouteObject = getRouteObjectByRouteName(currentRouteName)

  return !!currentRouteObject?.protected
}

function containsAdmin(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/admin(\/.*)?$/
  return regex.test(value)
}

function containsAdminOnly(value: string): boolean {
  const regex = /^(\/[a-zA-Z]{2})?\/admin$/
  return regex.test(value)
}

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const session = await auth()
    const isAdmin = session?.user?.role?.includes(UserRole.ADMIN)
    const { nextUrl } = request
    const locale = await getLocale()

    // Check if the route is protected
    if (containsProtectedRoute(nextUrl.pathname)) {
      if (!session) {
        // Not logged in & Protected route -> Redirect to login
        const url = `${routes.auth?.path}${routes.auth?.children?.login.path}?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`
        return NextResponse.redirect(new URL(url, request.url))
      }
    }

    if (session && containsAdmin(nextUrl.pathname)) {
      if (!isAdmin) {
        return NextResponse.redirect(new URL(routes.home.path, request.url))
      }

      if (isAdmin && !containsAdminOnly(nextUrl.pathname)) {
        return next(request, _next)
      }
    }

    if (
      session &&
      isAdmin &&
      (!containsAdmin(nextUrl.pathname) || containsAdminOnly(nextUrl.pathname))
    ) {
      const defaultRoute = routes.admin?.children
        ? Object.values(routes.admin.children).find((child) => !!child.default)
        : undefined
      const url = `${routes.admin.path}${defaultRoute?.path}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    // Handle auth pages when logged in
    if (session && containsAuth(nextUrl.pathname)) {
      const callbackUrl = nextUrl.searchParams.get('callbackUrl')
      const url = `${callbackUrl ? callbackUrl : routes.guest.path}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    // Handle account settings redirect
    if (session && containsAccountSettingsOnly(nextUrl.pathname)) {
      const defaultRoute = routes.account?.children
        ? Object.values(routes.account.children).find(
            (child) => !!child.default,
          )
        : undefined
      const url = `${routes.account.path}${defaultRoute?.path}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    // Handle host routes
    if (session && containsHostOnly(nextUrl.pathname)) {
      const defaultRoute = routes.host?.children
        ? Object.values(routes.host.children).find((child) => !!child.default)
        : undefined
      const url = `${routes.host.path}${defaultRoute?.path}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    // Handle guest routes
    if (session && containsGuestOnly(nextUrl.pathname)) {
      const defaultRoute = routes.guest?.children
        ? Object.values(routes.guest.children).find((child) => !!child.default)
        : undefined
      const url = `${routes.guest.path}${defaultRoute?.path}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    return next(request, _next)
  }
}
