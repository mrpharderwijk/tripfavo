import { PriceType } from '@prisma/client'

import { PublicPropertyPriceDetail } from '@/features/properties/types/public-property'

export function getCleaningFee(
  priceDetails?: PublicPropertyPriceDetail[],
): number {
  if (!priceDetails?.length) {
    return 0
  }

  return (
    priceDetails.find(
      (priceDetail) => priceDetail.type === PriceType.CLEANING_FEE,
    )?.price ?? 0
  )
}
