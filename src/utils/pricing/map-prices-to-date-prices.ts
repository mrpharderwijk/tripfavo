import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getCalendarPrices } from '@/components/organisms/date-picker-calendar/utils/get-calendar-prices'
import { PublicPropertyPriceDetail } from '@/features/properties/types/public-property'

export function mapPricesToDatePrices(
  priceDetails: PublicPropertyPriceDetail[],
): DatePrice[] {
  return getCalendarPrices(priceDetails)
}
