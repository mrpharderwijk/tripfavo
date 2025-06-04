import { isSameDay, startOfDay } from 'date-fns'
import { isBefore } from 'date-fns'

export function isDateDisabled(date: Date, disabledDates: Date[]): boolean {
  return (
    isBefore(startOfDay(date), startOfDay(new Date())) ||
    disabledDates.some((disabledDate) => isSameDay(date, disabledDate))
  )
}
