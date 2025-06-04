import { PriceDate } from '@/components/organisms/date-picker-calendar/date-picker-calendar'

export function getPriceForDate(date: Date, datePrices: PriceDate[]): number | undefined {
  const month = date.getMonth()

  // Find the price range that contains this month
  const priceRange = datePrices.find((range) => {
    return month >= range.startMonth && month <= range.endMonth
  })

  return priceRange?.price
}
