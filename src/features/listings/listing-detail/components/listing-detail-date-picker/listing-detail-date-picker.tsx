'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useRef } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DatePickerCalendar } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { handleOnSelectDayPicker } from '@/components/organisms/date-picker-calendar/utils/handle-on-select-day-picker'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { Locales } from '@/i18n/routing'

export function ListingDetailDatePicker(): ReactElement {
  const locale = useLocale()
  const tListingDates = useTranslations('listing.dates')
  const datePickerRef = useRef<HTMLDivElement | null>(null)
  const { calendarPrices, selectedDateRange, setSelectedDateRange } =
    useListingDetailContext()

  // TODO: Get from API
  const disabledDates = [
    new Date(2025, 5, 18),
    new Date(2025, 5, 19),
    new Date(2025, 5, 20),
    new Date(2025, 5, 28),
  ]

  return (
    <div ref={datePickerRef}>
      <FlexBox tag="section" flex-direction="col" gap={6}>
        {tListingDates('heading') && (
          <Heading tag="h2" like="h3-semibold">
            {tListingDates('heading')}
          </Heading>
        )}

        <FlexBox align-items="center" justify-content="center" fullWidth>
          <FlexBox max-width="lg" fullWidth>
            <DatePickerCalendar
              disabledDates={disabledDates}
              priceDates={calendarPrices}
              locale={locale as Locales}
              selected={selectedDateRange}
              onSelect={(date) =>
                handleOnSelectDayPicker(
                  date,
                  setSelectedDateRange,
                  disabledDates,
                )
              }
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </div>
  )
}
