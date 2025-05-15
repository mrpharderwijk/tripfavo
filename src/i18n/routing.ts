import { defineRouting } from 'next-intl/routing'

export const locales = ['en-US', 'fr-FR', 'nl-NL']
export const defaultLocale = 'en-US'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
})
