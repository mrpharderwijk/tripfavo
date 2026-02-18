'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useRef } from 'react'
import { DateRange } from 'react-day-picker'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DatePickerCalendar } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { handleOnSelectDayPicker } from '@/components/organisms/date-picker-calendar/utils/handle-on-select-day-picker'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'
import { Locale } from '@/i18n/config'
import {
  formatDateRangeToDateRangeView,
  formatSelectedDates,
} from '@/utils/date/format-selected-dates'

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

  function handleOnDatePickerSelect(date: DateRange | undefined): void {
    handleOnSelectDayPicker({
      date: formatDateRangeToDateRangeView({ dateRange: date }),
      setSelected: setSelectedDateRange,
      disabledDates,
    })
  }

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
              selected={formatSelectedDates({
                selectedDates: selectedDateRange,
              })}
              onSelect={(date) => handleOnDatePickerSelect(date)}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </div>
  )
}
