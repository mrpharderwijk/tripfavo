'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useRef } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DatePickerCalendar } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { handleOnSelectDayPicker } from '@/components/organisms/date-picker-calendar/utils/handle-on-select-day-picker'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'
import { Locale } from '@/i18n/config'

export function PropertyDetailDatePicker(): ReactElement {
  const locale = useLocale()
  const tPropertyDates = useTranslations('property.dates')
  const datePickerRef = useRef<HTMLDivElement | null>(null)
  const { calendarPrices, selectedDateRange, setSelectedDateRange } =
    usePropertyDetailContext()

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
        {tPropertyDates('heading') && (
          <Heading tag="h2" like="h3-semibold">
            {tPropertyDates('heading')}
          </Heading>
        )}

        <FlexBox align-items="center" justify-content="center" fullWidth>
          <FlexBox max-width="lg" fullWidth>
            <DatePickerCalendar
              disabledDates={disabledDates}
              priceDates={calendarPrices}
              locale={locale as Locale}
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
