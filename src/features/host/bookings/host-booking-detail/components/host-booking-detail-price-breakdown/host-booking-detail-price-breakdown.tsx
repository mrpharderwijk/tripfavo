'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { datePrices } from '@/data/date-prices'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'
import { getCleaningFee } from '@/features/listings/utils/get-cleaning-fee'
import { getDeposit } from '@/features/listings/utils/get-deposit'
import { Locale } from '@/i18n/config'
import { parseDbDateStringToDate } from '@/utils/date/date-string-to-date'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export function HostBookingDetailPriceBreakdown(): ReactElement {
  const locale = useLocale()
  const { booking } = useHostBookingDetailContext()
  const tBookingDetailPriceBreakdown = useTranslations(
    'bookingDetail.priceBreakdown',
  )
  console.log(booking)
  const totalPricePerNight = calculateTotalPricePerNight({
    startDate: parseDbDateStringToDate(booking?.startDate ?? ''),
    endDate: parseDbDateStringToDate(booking?.endDate ?? ''),
    datePrices,
  })

  const cleaningFee = getCleaningFee(booking?.priceDetails)
  const deposit = getDeposit(booking?.priceDetails)
  const totalPrice = calculateTotalPriceIncludingCleaningFee({
    priceDetails: booking?.priceDetails,
    startDate: parseDbDateStringToDate(booking?.startDate ?? ''),
    endDate: parseDbDateStringToDate(booking?.endDate ?? ''),
    datePrices,
  })

  return (
    <FlexBox flex-direction="col" padding-b={6} gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tBookingDetailPriceBreakdown('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={4}>
        <FlexBox flex-direction="col" gap={2}>
          {totalPricePerNight?.map(({ nightAmount, pricePerNight, total }) => (
            <FlexBox
              key={`${nightAmount}-${pricePerNight}`}
              flex-direction="row"
            >
              <FlexBoxItem flex="auto">
                <Body tag="span" size="base-lgt" font-weight="normal">
                  <LocalizedPrice
                    price={pricePerNight}
                    locale={locale as Locale}
                  />{' '}
                  x{' '}
                  {tBookingDetailPriceBreakdown('nightAmount', {
                    amount: nightAmount,
                  })}
                </Body>
              </FlexBoxItem>
              <FlexBoxItem flex="initial">
                <Body tag="span" size="base-lgt" font-weight="normal">
                  <LocalizedPrice price={total} locale={locale as Locale} />
                </Body>
              </FlexBoxItem>
            </FlexBox>
          ))}

          <FlexBox flex-direction="row">
            <FlexBoxItem flex="auto">
              <Body tag="span" size="base-lgt" font-weight="normal">
                {tBookingDetailPriceBreakdown('cleaningFee')}
              </Body>
            </FlexBoxItem>
            <FlexBoxItem flex="initial">
              <Body tag="span" size="base-lgt" font-weight="normal">
                <LocalizedPrice price={cleaningFee} locale={locale as Locale} />
              </Body>
            </FlexBoxItem>
          </FlexBox>

          <FlexBox flex-direction="row">
            <FlexBoxItem flex="auto">
              <Body tag="span" size="base-lgt" font-weight="normal">
                {tBookingDetailPriceBreakdown('deposit')}
              </Body>
            </FlexBoxItem>
            <FlexBoxItem flex="initial">
              <Body tag="span" size="base-lgt" font-weight="normal">
                <LocalizedPrice price={deposit} locale={locale as Locale} />
              </Body>
            </FlexBoxItem>
          </FlexBox>
        </FlexBox>

        <Divider />

        <FlexBox flex-direction="row">
          <FlexBoxItem flex="auto">
            <Body tag="span" size="base-lgt" font-weight="bold">
              {tBookingDetailPriceBreakdown('total')}
            </Body>
          </FlexBoxItem>
          <FlexBoxItem flex="initial">
            <Body tag="span" size="base-lgt" font-weight="bold">
              <LocalizedPrice price={totalPrice} locale={locale as Locale} />
            </Body>
          </FlexBoxItem>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
