import { enUS, fr, nl } from 'date-fns/locale'

export const localeToDateFnsLocaleMap = {
  'en-US': enUS,
  'fr-FR': fr,
  'nl-NL': nl,
}

export function localeToDateFnsLocale(locale: string) {
  return localeToDateFnsLocaleMap[locale as keyof typeof localeToDateFnsLocaleMap] ?? enUS
}
