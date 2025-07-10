import { PriceType } from '@prisma/client'

import { PublicPropertyPriceDetail } from '@/features/properties/types/public-property'

export function getMidSeasonPrice(
  priceDetails: PublicPropertyPriceDetail[],
): number {
  if (!priceDetails?.length) {
    return 0
  }

  return (
    priceDetails.find(
      (priceDetail) => priceDetail.type === PriceType.MID_SEASON,
    )?.price ?? 0
  )
}
