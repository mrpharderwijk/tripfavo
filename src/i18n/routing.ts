import { defineRouting } from 'next-intl/routing'

export type Locales = 'en-US' | 'fr-FR' | 'nl-NL'
export const locales: Locales[] = ['en-US', 'fr-FR', 'nl-NL']
export const defaultLocale: Locales = 'en-US'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
})
