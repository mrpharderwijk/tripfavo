import { PublicListing, PublicListingPriceDetail } from "@/features/listings/types/public-listing"
import { PriceType } from "@prisma/client"

export function getDeposit(priceDetails: PublicListingPriceDetail[]) {
  if (!priceDetails?.length) {
    return 0
  }

  return priceDetails.find(
    (priceDetail) => priceDetail.type === PriceType.DEPOSIT,
  )?.price ?? 0
}