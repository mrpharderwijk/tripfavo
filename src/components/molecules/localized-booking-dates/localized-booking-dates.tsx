import { LocalizedDate } from '@/components/atoms/localized-date/localized-date'
import { Locales } from '@/i18n/routing'

type LocalizedBookingDatesProps = {
  startDate: Date
  endDate: Date
  locale: Locales
}

export function LocalizedBookingDates({ startDate, endDate, locale }: LocalizedBookingDatesProps) {
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
