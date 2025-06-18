import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'

export function getPriceForDate(
  date: Date,
  datePrices: DatePrice[],
): number | undefined {
  const month = date.getMonth()

  // Find the price range that contains this month
  const priceRange = datePrices.find((range) => {
    return month >= range.startMonth && month <= range.endMonth
  })

  return priceRange?.price ?? 0
}
