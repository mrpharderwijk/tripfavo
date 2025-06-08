import { DateRange } from 'react-day-picker'

import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getPriceForDate } from '@/components/organisms/date-picker-calendar/utils/get-price-for-date'

export function calculateTotalPrice(range: DateRange | undefined, datePrices: DatePrice[]): number {
  if (!range?.from || !range?.to) return 0

  let total = 0
  let currentDate = new Date(range.from)

  // We only count nights, so we stop before the end date
  while (currentDate < range.to) {
    const price = getPriceForDate(currentDate, datePrices)
    if (price) {
      total += price
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return total
}
