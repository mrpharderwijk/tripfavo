import { ReactElement } from 'react'

import { Locales } from '@/i18n/routing'

type LocalizedPriceProps = {
  price: string | number
  locale: Locales
  minFractionDigits?: number
  maxFractionDigits?: number
}

const localeToCurrency: Record<Locales, { currency: string; rate?: number }> = {
  'en-US': {
    currency: 'USD',
    rate: 1.142906,
  },
  'fr-FR': {
    currency: 'EUR',
  },
  'nl-NL': {
    currency: 'EUR',
  },
}

export function LocalizedPrice({
  price,
  locale,
  minFractionDigits = 2,
  maxFractionDigits = 2,
}: LocalizedPriceProps): ReactElement {
  const rate = localeToCurrency[locale]?.rate ?? 1
  const currency = localeToCurrency[locale]?.currency ?? 'EUR'
  const priceInBaseCurrency = Number(price) * rate

  const localizedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(Number(priceInBaseCurrency))

  return <span className="lining-nums tabular-nums">{localizedPrice}</span>
}
