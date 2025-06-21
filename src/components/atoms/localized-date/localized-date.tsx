import { defaultLocale, Locale } from '@/i18n/config'

type LocalizedDateProps = {
  date: Date
  locale: Locale
}

const localeToDateLocaleMap: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  nl: 'nl-NL',
}

export function LocalizedDate({
  date,
  locale,
}: LocalizedDateProps): string | null {
  if (!date) {
    return null
  }
  const dateLocale = localeToDateLocaleMap[locale] ?? defaultLocale

  return date.toLocaleDateString(dateLocale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
