import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getPriceForDate } from '@/components/organisms/date-picker-calendar/utils/get-price-for-date'

type CalculateTotalPriceParams = {
  startDate?: Date,
  endDate?: Date,
  datePrices: DatePrice[]
}

export function calculateTotalPrice({startDate, endDate, datePrices }: CalculateTotalPriceParams): number {
  if (!startDate || !endDate) return 0

  let total = 0
  let currentDate = new Date(startDate)

  // We only count nights, so we stop before the end date
  while (currentDate < endDate) {
    const price = getPriceForDate(currentDate, datePrices)
    if (price) {
      total += price
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return total
}
