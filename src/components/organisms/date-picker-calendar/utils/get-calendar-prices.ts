import { PriceType } from '@prisma/client'

import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { PublicProperty } from '@/features/properties/types/public-property'

export function getCalendarPrices(
  priceDetails: PublicProperty['priceDetails'],
): DatePrice[] {
  return [
    ...getHighSeasonPrice(priceDetails),
    ...getMidSeasonPrice(priceDetails),
    ...getLowSeasonPrice(priceDetails),
  ]
}

function getHighSeasonPrice(
  priceDetails: PublicProperty['priceDetails'],
): DatePrice[] {
  return [
    // High Season
    {
      startMonth: 6, // July (0-based)
      endMonth: 7, // August
      price:
        priceDetails?.find((price) => price.type === PriceType.HIGH_SEASON)
          ?.price ?? null,
    },
  ]
}

function getMidSeasonPrice(
  priceDetails: PublicProperty['priceDetails'],
): DatePrice[] {
  return [
    // Mid Season
    {
      startMonth: 3, // April
      endMonth: 5, // June
      price:
        priceDetails?.find((price) => price.type === PriceType.MID_SEASON)
          ?.price ?? null,
    },
    {
      startMonth: 8, // September
      endMonth: 9, // October
      price:
        priceDetails?.find((price) => price.type === PriceType.MID_SEASON)
          ?.price ?? null,
    },
    {
      startMonth: 11, // December
      endMonth: 11, // December
      price:
        priceDetails?.find((price) => price.type === PriceType.LOW_SEASON)
          ?.price ?? null,
    },
  ]
}

function getLowSeasonPrice(
  priceDetails: PublicProperty['priceDetails'],
): DatePrice[] {
  return [
    // Low season
    {
      startMonth: 10, // November
      endMonth: 10, // November
      price:
        priceDetails?.find((price) => price.type === PriceType.LOW_SEASON)
          ?.price ?? null,
    },
    {
      startMonth: 0, // January
      endMonth: 2, // March
      price:
        priceDetails?.find((price) => price.type === PriceType.LOW_SEASON)
          ?.price ?? null,
    },
  ]
}
