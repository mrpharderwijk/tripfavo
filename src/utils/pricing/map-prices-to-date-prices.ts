import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getCalendarPrices } from '@/components/organisms/date-picker-calendar/utils/get-calendar-prices'
import { PublicListingPriceDetail } from '@/features/listings/types/public-listing'

export function mapPricesToDatePrices(
  priceDetails: PublicListingPriceDetail[],
): DatePrice[] {
  return getCalendarPrices(priceDetails)
}
