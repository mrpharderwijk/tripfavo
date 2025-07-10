import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { calculateTotalPrice } from '@/components/organisms/date-picker-calendar/utils/calculate-total-price'
import { PublicPropertyPriceDetail } from '@/features/properties/types/public-property'
import { getCleaningFee } from '@/features/properties/utils/get-cleaning-fee'
import { getDeposit } from '@/features/properties/utils/get-deposit'

export type CalculateTotalPriceIncludingCleaningFeeParams = {
  priceDetails?: PublicPropertyPriceDetail[]
  startDate?: Date
  endDate?: Date
  datePrices: DatePrice[]
}

export function calculateTotalPriceIncludingCleaningFee({
  priceDetails,
  startDate,
  endDate,
  datePrices,
}: CalculateTotalPriceIncludingCleaningFeeParams): number {
  if (!startDate || !endDate || !datePrices.length || !priceDetails?.length) {
    return 0
  }

  const cleaningFee = getCleaningFee(priceDetails)
  const deposit = getDeposit(priceDetails)

  return (
    calculateTotalPrice({ startDate, endDate, datePrices }) +
    cleaningFee +
    deposit
  )
}
