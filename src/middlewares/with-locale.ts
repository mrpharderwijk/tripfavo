import Negotiator from 'negotiator'
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'

import { locales } from '@/i18n/routing'
import { defaultLocale } from '@/i18n/routing'

function getLocale(request: Request): string {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  const requestedLocales =
    languages.length === 1 && languages[0] === '*' ? [defaultLocale] : languages

  return match(requestedLocales, locales, defaultLocale)
}

export function withLocale(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const languageCookie = request.cookies.get('localeCookie')?.value
    const pathname = request.nextUrl.pathname

    if (!languageCookie) {
      let locale = getLocale(request) ?? defaultLocale
      const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl)
      console.log('withLocale', locale)
      return NextResponse.rewrite(newUrl)
    }
    const newUrl = new URL(`/${languageCookie}${pathname}`, request.nextUrl)

    if (languageCookie) {
      return NextResponse.rewrite(newUrl)
    }
    return middleware(request, event)
  }
}
