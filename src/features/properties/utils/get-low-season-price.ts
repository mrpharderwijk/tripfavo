import { PriceType } from '@prisma/client'

import { PublicPropertyPriceDetail } from '@/features/properties/types/public-property'

export function getLowSeasonPrice(
  priceDetails: PublicPropertyPriceDetail[],
): number {
  if (!priceDetails?.length) {
    return 0
  }

  return (
    priceDetails.find(
      (priceDetail) => priceDetail.type === PriceType.LOW_SEASON,
    )?.price ?? 0
  )
}
