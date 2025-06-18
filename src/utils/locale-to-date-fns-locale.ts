import { enUS, fr, Locale, nl } from 'date-fns/locale'

export const localeToDateFnsLocaleMap = {
  'en-US': enUS,
  'fr-FR': fr,
  'nl-NL': nl,
}

export function localeToDateFnsLocale(locale: string): Locale {
  return (
    localeToDateFnsLocaleMap[locale as keyof typeof localeToDateFnsLocaleMap] ??
    enUS
  )
}
