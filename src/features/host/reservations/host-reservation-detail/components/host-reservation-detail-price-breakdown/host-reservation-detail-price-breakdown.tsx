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
import { useHostReservationDetailContext } from '@/features/host/reservations/host-reservation-detail/providers/host-reservation-detail-context-provider'
import { getCleaningFee } from '@/features/listings/utils/get-cleaning-fee'
import { getDeposit } from '@/features/listings/utils/get-deposit'
import { Locale } from '@/i18n/config'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export function HostReservationDetailPriceBreakdown(): ReactElement {
  const locale = useLocale()
  const { reservation } = useHostReservationDetailContext()
  const tReservationDetailPriceBreakdown = useTranslations(
    'reservationDetail.priceBreakdown',
  )

  const totalPricePerNight = calculateTotalPricePerNight({
    startDate: reservation?.startDate,
    endDate: reservation?.endDate,
    datePrices,
  })

  const cleaningFee = getCleaningFee(reservation?.priceDetails)
  const deposit = getDeposit(reservation?.priceDetails)
  const totalPrice = calculateTotalPriceIncludingCleaningFee({
    priceDetails: reservation?.priceDetails,
    startDate: reservation?.startDate,
    endDate: reservation?.endDate,
    datePrices,
  })

  return (
    <FlexBox flex-direction="col" padding-b={6} gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailPriceBreakdown('heading')}
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
                  {tReservationDetailPriceBreakdown('nightAmount', {
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
                {tReservationDetailPriceBreakdown('cleaningFee')}
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
                {tReservationDetailPriceBreakdown('deposit')}
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
              {tReservationDetailPriceBreakdown('total')}
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
