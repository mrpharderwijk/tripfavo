'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { DatePickerCalendar } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { calculatePricePerNight } from '@/components/organisms/date-picker-calendar/utils/calculate-price-per-night'
import { handleOnSelectDayPicker } from '@/components/organisms/date-picker-calendar/utils/handle-on-select-day-picker'
import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { Locales } from '@/i18n/routing'

export function ListingDetailDatePicker(): ReactElement {
  const datePickerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const locale = useLocale()
  const tListingDates = useTranslations('listing.dates')
  const tCommon = useTranslations('common')
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)
  const { listing } = useListingDetailContext()

  // TODO: Get from API
  const disabledDates = [
    new Date(2025, 5, 18),
    new Date(2025, 5, 19),
    new Date(2025, 5, 20),
    new Date(2025, 5, 28),
  ]

  // TODO: Get from API
  const datePrices = [
    // High Season
    {
      startMonth: 6, // July (0-based)
      endMonth: 7, // August
      price: 250,
    },

    // Mid Season
    {
      startMonth: 3, // April
      endMonth: 5, // June
      price: 175,
    },
    {
      startMonth: 8, // September
      endMonth: 9, // October
      price: 175,
    },
    {
      startMonth: 11, // December
      endMonth: 11, // December
      price: 175,
    },

    // Low season
    {
      startMonth: 10, // November
      endMonth: 10, // November
      price: 150,
    },
    {
      startMonth: 0, // January
      endMonth: 2, // March
      price: 150,
    },
  ]

  function handleOnClickBook() {
    if (!selected?.from || !selected?.to) {
      datePickerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const startDate = format(selected?.from, DATE_FORMAT_SEARCH_PARAMS)
    const endDate = format(selected?.to, DATE_FORMAT_SEARCH_PARAMS)

    router.push(`/reservation/${listing.id}?startDate=${startDate}&endDate=${endDate}`)
  }

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
              priceDates={datePrices}
              locale={locale as Locales}
              selected={selected}
              onSelect={(date) => handleOnSelectDayPicker(date, setSelected, disabledDates)}
            />
          </FlexBox>
        </FlexBox>

        <BottomBar>
          <FlexBox flex-direction="row" align-items="center" justify-content="between" fullWidth>
            <div className="flex flex-col">
              {!selected?.from && !selected?.to && (
                <Body color="primary" size="base-xl" font-weight="semibold">
                  {tListingDates('selectDates')}
                </Body>
              )}

              {selected?.from && selected?.to && (
                <Body color="primary" size="base-xl" font-weight="semibold">
                  {/* TODO: Add translation */}
                  <LocalizedPrice
                    price={calculatePricePerNight(selected, datePrices)}
                    locale={locale as Locales}
                    minFractionDigits={0}
                    maxFractionDigits={0}
                  />{' '}
                  per night
                </Body>
              )}

              {selected && (
                <Body color="primary" size="base-lgt">
                  <LocalizedBookingDates
                    startDate={selected?.from}
                    endDate={selected?.to}
                    locale={locale as Locales}
                  />
                </Body>
              )}
            </div>

            <Button variant="secondary" size="lg" onClick={handleOnClickBook}>
              {selected ? tListingDates('button.book') : tListingDates('button.reserve')}
            </Button>
          </FlexBox>
        </BottomBar>
      </FlexBox>
    </div>
  )
}
