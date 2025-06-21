export type Locale = (typeof locales)[number]

export const locales = ['en', 'fr', 'nl'] as const
export const defaultLocale: Locale = 'en'
export const languages = [
  { code: 'en', name: 'English', countryName: 'United Kingdom' },
  { code: 'en', name: 'English', countryName: 'United States' },
  { code: 'fr', name: 'Français', countryName: 'Belgique' },
  { code: 'fr', name: 'Français', countryName: 'France' },
  { code: 'fr', name: 'Français', countryName: 'Suisse' },
  { code: 'fr', name: 'Français', countryName: 'Luxembourg' },
  { code: 'nl', name: 'Nederlands', countryName: 'Netherlands' },
  { code: 'nl', name: 'Vlaams', countryName: 'België' },
]
