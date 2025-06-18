import { isBefore } from 'date-fns'
import { DateRange } from 'react-day-picker'

export function updateSelectedValue(
  prevSelected: DateRange | undefined,
  date: DateRange,
): DateRange | undefined {
  // If prevSelected is undefined, just return the new date
  if (!prevSelected) {
    if (date.from && date.to) {
      if (isBefore(date.from as Date, date.to as Date)) {
        return {
          from: date.to,
          to: undefined,
        }
      }
    }
    return date
  }

  const fromChanged = prevSelected?.from !== date.from
  const toChanged = prevSelected?.to !== date.to

  if (fromChanged) {
    if (isBefore(date.from as Date, date.to as Date)) {
      return {
        from: date.from,
        to: undefined,
      }
    }
  }

  if (toChanged) {
    if (isBefore(date.to as Date, date.from as Date)) {
      return {
        from: date.to,
        to: undefined,
      }
    }
  }

  if (isBefore(date.from as Date, date.to as Date)) {
    return {
      from: date.to,
      to: undefined,
    }
  }
}
