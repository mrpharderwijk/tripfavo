import { PublicListingPriceDetail } from "@/features/listings/types/public-listing"
import { PriceType } from "@prisma/client"

export function getMidSeasonPrice(priceDetails: PublicListingPriceDetail[]) {
  if (!priceDetails?.length) {
    return 0
  }

  return priceDetails.find(
    (priceDetail) => priceDetail.type === PriceType.MID_SEASON,
  )?.price ?? 0
}