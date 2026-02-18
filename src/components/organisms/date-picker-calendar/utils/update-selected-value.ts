import { isBefore } from 'date-fns'

import { DateRangeView } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { formatDateObjectToDateString } from '@/utils/date/format-date-object-to-date-string'
import { formatSelectedDates } from '@/utils/date/format-selected-dates'

export function updateSelectedValue(
  prevSelected: DateRangeView | undefined,
  date: DateRangeView,
): DateRangeView | undefined {
  const formattedSelectedDates = formatSelectedDates({
    selectedDates: prevSelected,
  })

  // If prevSelected is undefined, just return the new date
  if (!prevSelected) {
    if (formattedSelectedDates.from && formattedSelectedDates.to) {
      if (
        isBefore(
          formattedSelectedDates.from as Date,
          formattedSelectedDates.to as Date,
        )
      ) {
        return {
          from: formatDateObjectToDateString({
            date: formattedSelectedDates.to,
          }),
          to: undefined,
        }
      }
    }
    return date
  }

  const fromChanged = prevSelected?.from !== date.from
  const toChanged = prevSelected?.to !== date.to

  if (fromChanged) {
    if (
      isBefore(
        formattedSelectedDates.from as Date,
        formattedSelectedDates.to as Date,
      )
    ) {
      return {
        from: formatDateObjectToDateString({
          date: formattedSelectedDates.from,
        }),
        to: undefined,
      }
    }
  }

  if (toChanged) {
    if (
      isBefore(
        formattedSelectedDates.to as Date,
        formattedSelectedDates.from as Date,
      )
    ) {
      return {
        from: formatDateObjectToDateString({
          date: formattedSelectedDates.to,
        }),
        to: undefined,
      }
    }
  }

  if (
    isBefore(
      formattedSelectedDates.from as Date,
      formattedSelectedDates.to as Date,
    )
  ) {
    return {
      from: formatDateObjectToDateString({
        date: formattedSelectedDates.to,
      }),
      to: undefined,
    }
  }
}
