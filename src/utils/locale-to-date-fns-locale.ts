import { enUS, fr, Locale as DateFnsLocale, nl } from 'date-fns/locale'

import { Locale } from '@/i18n/config'

export const localeToDateFnsLocaleMap: Record<Locale, DateFnsLocale> = {
  en: enUS,
  fr: fr,
  nl: nl,
}

export function localeToDateFnsLocale(locale: string): DateFnsLocale {
  return (
    localeToDateFnsLocaleMap[locale as keyof typeof localeToDateFnsLocaleMap] ??
    enUS
  )
}
