import { ReactElement } from 'react'

import { defaultLocale, Locale } from '@/i18n/config'

type LocalizedPriceProps = {
  price: string | number
  locale: Locale
  minFractionDigits?: number
  maxFractionDigits?: number
}

const localeToCurrencyMap: Record<Locale, { currency: string; rate: number }> =
  {
    en: {
      currency: 'USD',
      rate: 1.142906,
    },
    fr: {
      currency: 'EUR',
      rate: 1,
    },
    nl: {
      currency: 'EUR',
      rate: 1,
    },
  }

export function LocalizedPrice({
  price,
  locale,
  minFractionDigits = 2,
  maxFractionDigits = 2,
}: LocalizedPriceProps): ReactElement {
  const rate = localeToCurrencyMap[locale ?? defaultLocale].rate
  const currency = localeToCurrencyMap[locale ?? defaultLocale].currency
  const priceInBaseCurrency = Number(price) * rate

  const localizedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(Number(priceInBaseCurrency))

  return <span className="lining-nums tabular-nums">{localizedPrice}</span>
}
