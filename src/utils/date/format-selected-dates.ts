import { DateRange } from 'react-day-picker'

import { formatDateStringToDateObject } from './format-date-string-to-date-object'

import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
import { DateRangeView } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { formatDateObjectToDateString } from '@/utils/date/format-date-object-to-date-string'

export type FormatSelectedDatesParams = {
  selectedDates?: DateRangeView | null
  dateFormat?: string
}

export function formatSelectedDates({
  selectedDates,
  dateFormat = DATE_FORMAT_SEARCH_PARAMS,
}: FormatSelectedDatesParams): DateRange {
  return {
    from: formatDateStringToDateObject({
      dateString: selectedDates?.from,
      dateFormat,
    }),
    to: formatDateStringToDateObject({
      dateString: selectedDates?.to,
      dateFormat,
    }),
  }
}

export type FormatDateRangeToDateRangeViewParams = {
  dateRange?: DateRange
}

export function formatDateRangeToDateRangeView({
  dateRange,
}: FormatDateRangeToDateRangeViewParams): DateRangeView | undefined {
  if (!dateRange) {
    return undefined
  }

  return {
    from: dateRange.from
      ? formatDateObjectToDateString({ date: dateRange.from })
      : undefined,
    to: dateRange.to
      ? formatDateObjectToDateString({ date: dateRange.to })
      : undefined,
  }
}
