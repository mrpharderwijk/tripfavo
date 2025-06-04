import { DateRange } from 'react-day-picker'

import { PriceDate } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { getPriceForDate } from '@/components/organisms/date-picker-calendar/utils/get-price-for-date'

export function calculateTotalPrice(range: DateRange | undefined, datePrices: PriceDate[]): number {
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
