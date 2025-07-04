'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, RefObject } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { Body } from '@/components/atoms/typography/body/body'
import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { calculatePricePerNight } from '@/components/organisms/date-picker-calendar/utils/calculate-price-per-night'
import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'
import { Locale } from '@/i18n/config'

type PropertyDetailBottomBarProps = {
  datePickerRef: RefObject<HTMLDivElement | null>
}

export function PropertyDetailBottomBar({
  datePickerRef,
}: PropertyDetailBottomBarProps): ReactElement {
  const tPropertyDetailBottomBar = useTranslations('propertyDetail.bottomBar')
  const locale = useLocale()
  const router = useRouter()
  const { property, selectedDateRange, calendarPrices } =
    usePropertyDetailContext()

  function handleOnClickBook(): void {
    if (!selectedDateRange?.from || !selectedDateRange?.to) {
      if (datePickerRef?.current) {
        datePickerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      return
    }

    const startDate = format(selectedDateRange?.from, DATE_FORMAT_SEARCH_PARAMS)
    const endDate = format(selectedDateRange?.to, DATE_FORMAT_SEARCH_PARAMS)

    router.push(
      `/booking/${property.id}?startDate=${startDate}&endDate=${endDate}`,
    )
  }

  return (
    <BottomBar>
      <FlexBox
        flex-direction="col"
        flex-direction-sm="row"
        align-items="center"
        justify-content="between"
        fullWidth
        gap={4}
        gap-md={10}
      >
        <FlexBoxItem flex="auto" flex-direction="col" gap={1}>
          {!selectedDateRange?.from && !selectedDateRange?.to && (
            <Body color="secondary" size="base-mdt" font-weight="semibold">
              {tPropertyDetailBottomBar('selectDates')}
            </Body>
          )}

          {selectedDateRange?.from && selectedDateRange?.to && (
            <Body color="primary" size="base-lgt" font-weight="semibold">
              <LocalizedPrice
                price={calculatePricePerNight(
                  selectedDateRange,
                  calendarPrices,
                )}
                locale={locale as Locale}
                minFractionDigits={0}
                maxFractionDigits={0}
              />{' '}
              {tPropertyDetailBottomBar('perNight')}
            </Body>
          )}

          {selectedDateRange && (
            <Body color="primary" size="base-mdt">
              <LocalizedBookingDates
                startDate={selectedDateRange?.from}
                endDate={selectedDateRange?.to}
                locale={locale as Locale}
              />
            </Body>
          )}
        </FlexBoxItem>

        <FlexBoxItem flex-sm="initial" fullWidth width-sm="fit">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleOnClickBook}
            fullWidth
            width-sm="fit"
          >
            {selectedDateRange
              ? tPropertyDetailBottomBar('button.labelSelected')
              : tPropertyDetailBottomBar('button.labelNonSelected')}
          </Button>
        </FlexBoxItem>
      </FlexBox>
    </BottomBar>
  )
}
