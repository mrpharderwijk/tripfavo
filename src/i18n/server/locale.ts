'use server'

import { cookies } from 'next/headers'

import { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies()

  return (cookieStore.get(COOKIE_NAME)?.value || defaultLocale) as Locale
}

export async function setUserLocale(locale: Locale): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
