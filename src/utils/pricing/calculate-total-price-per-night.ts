import { DatePrice } from "@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider"
import { TotalPricePerNight } from "@/features/reservations/reservation-detail/providers/reservation-detail-context-provider"

type CalculateTotalPricePerNightParams = {
  startDate?: Date
  endDate?: Date
  datePrices: DatePrice[]
}

export function calculateTotalPricePerNight({ startDate, endDate, datePrices }: CalculateTotalPricePerNightParams) {
  if (!startDate || !endDate) {
    return []
  }

  const priceBreakdown: TotalPricePerNight[] = []
  let currentDate = new Date(startDate)
  let currentPrice: number | null = null
  let nightsAtCurrentPrice = 0

  while (currentDate < endDate) {
    const month = currentDate.getMonth()
    const price =
      datePrices.find(
        (datePriceRange) =>
          month >= datePriceRange.startMonth && month <= datePriceRange.endMonth,
      )?.price || 0

    if (currentPrice === null) {
      currentPrice = price
      nightsAtCurrentPrice = 1
    } else if (currentPrice === price) {
      nightsAtCurrentPrice++
    } else {
      priceBreakdown.push({
        nightAmount: nightsAtCurrentPrice,
        pricePerNight: currentPrice,
        total: currentPrice * nightsAtCurrentPrice,
      })
      currentPrice = price
      nightsAtCurrentPrice = 1
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (nightsAtCurrentPrice > 0 && currentPrice !== null) {
    priceBreakdown.push({
      nightAmount: nightsAtCurrentPrice,
      pricePerNight: currentPrice,
      total: currentPrice * nightsAtCurrentPrice,
    })
  }

  return priceBreakdown
}