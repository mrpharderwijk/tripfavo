import { Locales } from '@/i18n/routing'

type LocalizedDateProps = {
  date: Date
  locale: Locales
}

export function LocalizedDate({ date }: LocalizedDateProps): string | null {
  if (!date) {
    return null
  }

  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}
