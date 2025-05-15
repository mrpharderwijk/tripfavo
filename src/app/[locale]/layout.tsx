import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'

import { routing } from '@/i18n/routing'

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>
}>

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
