import { isAfter, isBefore } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'

import { updateSelectedValue } from '@/components/organisms/date-picker-calendar/utils/update-selected-value'
import { DateRangeView } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { formatSelectedDates } from '@/utils/date/format-selected-dates'

export type HandleOnSelectDayPickerParams = {
  date: DateRangeView | undefined
  setSelected: Dispatch<SetStateAction<DateRangeView | undefined>>
  disabledDates?: Date[]
}

export function handleOnSelectDayPicker({
  date,
  setSelected,
  disabledDates,
}: HandleOnSelectDayPickerParams): void {
  if (!date) {
    setSelected(undefined)
    return
  }

  // If selecting a range, check if any dates in between are disabled
  if (date.from && date.to) {
    // Check if any disabled dates are between the range
    const formattedDates = formatSelectedDates({ selectedDates: date })
    if (
      disabledDates?.some(
        (disabledDate) =>
          isAfter(disabledDate, formattedDates.from!) &&
          isBefore(disabledDate, formattedDates.to!),
      )
    ) {
      setSelected((prevValue) => updateSelectedValue(prevValue, date))
      return
    }
  }

  if (date.from === date.to) {
    setSelected({ from: date.from, to: undefined })
    return
  }

  setSelected(date)
}
