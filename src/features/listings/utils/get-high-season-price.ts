import { PublicListingPriceDetail } from "@/features/listings/types/public-listing"
import { PriceType } from "@prisma/client"

export function getHighSeasonPrice(priceDetails: PublicListingPriceDetail[]) {
  if (!priceDetails?.length) {
    return 0
  }

  return priceDetails.find(
    (priceDetail) => priceDetail.type === PriceType.HIGH_SEASON,
  )?.price ?? 0
}