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
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { Locales } from '@/i18n/routing'

type ListingDetailBottomBarProps = {
  datePickerRef: RefObject<HTMLDivElement | null>
}

export function ListingDetailBottomBar({
  datePickerRef,
}: ListingDetailBottomBarProps): ReactElement {
  const tListingDetailBottomBar = useTranslations('listingDetail.bottomBar')
  const locale = useLocale()
  const router = useRouter()
  const { listing, selectedDateRange, calendarPrices } =
    useListingDetailContext()

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
      `/reservation/${listing.id}?startDate=${startDate}&endDate=${endDate}`,
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
        <FlexBoxItem flex="auto">
          {!selectedDateRange?.from && !selectedDateRange?.to && (
            <Body color="secondary" size="base-mdt" font-weight="semibold">
              {tListingDetailBottomBar('selectDates')}
            </Body>
          )}

          {selectedDateRange?.from && selectedDateRange?.to && (
            <Body color="primary" size="base-lgt" font-weight="semibold">
              {/* TODO: Add translation */}
              <LocalizedPrice
                price={calculatePricePerNight(
                  selectedDateRange,
                  calendarPrices,
                )}
                locale={locale as Locales}
                minFractionDigits={0}
                maxFractionDigits={0}
              />{' '}
              per night
            </Body>
          )}

          {selectedDateRange && (
            <Body color="primary" size="base-mdt">
              <LocalizedBookingDates
                startDate={selectedDateRange?.from}
                endDate={selectedDateRange?.to}
                locale={locale as Locales}
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
              ? tListingDetailBottomBar('button.labelSelected')
              : tListingDetailBottomBar('button.labelNonSelected')}
          </Button>
        </FlexBoxItem>
      </FlexBox>
    </BottomBar>
  )
}
