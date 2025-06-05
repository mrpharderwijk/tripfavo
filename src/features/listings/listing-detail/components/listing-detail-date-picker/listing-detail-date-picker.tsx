'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { DatePickerCalendar } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { calculateTotalPrice } from '@/components/organisms/date-picker-calendar/utils/calculate-total-price'
import { handleOnSelectDayPicker } from '@/components/organisms/date-picker-calendar/utils/handle-on-select-day-picker'
import { Locales } from '@/i18n/routing'

type ListingDetailDatePickerProps = { heading?: string }

export function ListingDetailDatePicker({ heading }: ListingDetailDatePickerProps): ReactElement {
  const locale = useLocale()
  const tListingDates = useTranslations('listing.dates')
  const tCommon = useTranslations('common')
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)

  const disabledDates = [
    new Date(2025, 5, 18),
    new Date(2025, 5, 19),
    new Date(2025, 5, 20),
    new Date(2025, 5, 28),
  ]

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

  return (
    <FlexBox tag="section" flex-direction="col" gap={6}>
      {tListingDates('heading') && (
        <Heading tag="h2" like="h3-semibold">
          {tListingDates('heading')}
        </Heading>
      )}

      <DatePickerCalendar
        disabledDates={disabledDates}
        priceDates={datePrices}
        locale={locale as Locales}
        selected={selected}
        onSelect={(date) => handleOnSelectDayPicker(date, setSelected, disabledDates)}
      />

      <BottomBar>
        <FlexBox flex-direction="row" align-items="center" justify-content="between" fullWidth>
          <div className="flex flex-col">
            {selected?.from && selected?.to && (
              <Body color="primary" size="base-xl" font-weight="semibold">
                Total:{' '}
                <LocalizedPrice
                  price={calculateTotalPrice(selected, datePrices)}
                  locale={locale as Locales}
                  minFractionDigits={0}
                  maxFractionDigits={0}
                />
              </Body>
            )}

            {selected && (
              <Body color="primary" size="base-lgt">
                {selected?.from?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} -{' '}
                {selected?.to?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </Body>
            )}
          </div>
          <Button variant="secondary" size="lg">
            {tListingDates('button.book')}
          </Button>
        </FlexBox>
      </BottomBar>
    </FlexBox>
  )
}
