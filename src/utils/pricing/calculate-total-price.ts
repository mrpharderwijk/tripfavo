import { DatePrice } from "@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider";
import { calculateTotalPrice } from "@/components/organisms/date-picker-calendar/utils/calculate-total-price";
import { PublicListingPriceDetail } from "@/features/listings/types/public-listing";
import { getCleaningFee } from "@/features/listings/utils/get-cleaning-fee";
import { getDeposit } from "@/features/listings/utils/get-deposit";
import { ListingPriceDetail, PriceType } from "@prisma/client";

export type CalculateTotalPriceIncludingCleaningFeeParams = {
  priceDetails: PublicListingPriceDetail[]
  startDate?: Date
  endDate?: Date
  datePrices: DatePrice[]
}

export function calculateTotalPriceIncludingCleaningFee({
  priceDetails,
  startDate,
  endDate,
  datePrices
}: CalculateTotalPriceIncludingCleaningFeeParams) {
  if (!startDate || !endDate || !datePrices.length || !priceDetails.length) {
    return 0
  }

  const cleaningFee = getCleaningFee(priceDetails)
  const deposit = getDeposit(priceDetails)

  return calculateTotalPrice({ startDate, endDate, datePrices }) + cleaningFee + deposit
}