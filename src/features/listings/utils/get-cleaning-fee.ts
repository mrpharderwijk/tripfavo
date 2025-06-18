import { PriceType } from '@prisma/client'

import { PublicListingPriceDetail } from '@/features/listings/types/public-listing'

export function getCleaningFee(
  priceDetails: PublicListingPriceDetail[],
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
