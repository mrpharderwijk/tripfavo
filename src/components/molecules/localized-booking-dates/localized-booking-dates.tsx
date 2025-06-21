import { ReactElement } from 'react'

import { LocalizedDate } from '@/components/atoms/localized-date/localized-date'
import { Locale } from '@/i18n/config'

type LocalizedBookingDatesProps = {
  startDate?: Date
  endDate?: Date
  locale: Locale
}

export function LocalizedBookingDates({
  startDate,
  endDate,
  locale,
}: LocalizedBookingDatesProps): ReactElement | null {
  if (!startDate || !endDate) {
    return null
  }

  return (
    <>
      {!!startDate && <LocalizedDate date={startDate} locale={locale} />} -{' '}
      {!!endDate && <LocalizedDate date={endDate} locale={locale} />}
    </>
  )
}
