import { isAfter, isBefore } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

import { updateSelectedValue } from '@/components/organisms/date-picker-calendar/utils/update-selected-value'

export function handleOnSelectDayPicker(
  date: DateRange | undefined,
  setSelected: Dispatch<SetStateAction<DateRange | undefined>>,
  disabledDates?: Date[],
): void {
  if (!date) {
    setSelected(undefined)
    return
  }

  // If selecting a range, check if any dates in between are disabled
  if (date.from && date.to) {
    // Check if any disabled dates are between the range
    if (
      disabledDates?.some(
        (disabledDate) =>
          isAfter(disabledDate, date.from!) && isBefore(disabledDate, date.to!),
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
