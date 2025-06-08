'use client'

import { useLocale, useTranslations } from 'next-intl'
import { PriceType } from '@prisma/client'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useReservationDetailContext } from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'
import { Locales } from '@/i18n/routing'

export function ReservationDetailPriceBreakdown() {
  const locale = useLocale()
  const { listing, calculateTotalPricePerNight, calculateTotalPriceIncludingCleaningFee } =
    useReservationDetailContext()
  const tReservationDetailPriceBreakdown = useTranslations('reservationDetail.priceBreakdown')

  const totalPricePerNight = calculateTotalPricePerNight()
  return (
    <FlexBox flex-direction="col" padding-b={6} gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailPriceBreakdown('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={4}>
        <FlexBox flex-direction="col" gap={2}>
          {totalPricePerNight?.map(({ nightAmount, pricePerNight, total }) => (
            <FlexBox key={`${nightAmount}-${pricePerNight}`} flex-direction="row">
              <FlexBoxItem flex="auto">
                <Body tag="span" size="base-lgt" font-weight="normal">
                  <LocalizedPrice price={pricePerNight} locale={locale as Locales} /> x{' '}
                  {tReservationDetailPriceBreakdown('nightAmount', {
                    amount: nightAmount,
                  })}
                </Body>
              </FlexBoxItem>
              <FlexBoxItem flex="initial">
                <Body tag="span" size="base-lgt" font-weight="normal">
                  <LocalizedPrice price={total} locale={locale as Locales} />
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
                <LocalizedPrice
                  price={
                    listing.priceDetails.find(
                      (priceDetail) => priceDetail.type === PriceType.CLEANING_FEE,
                    )?.amount ?? 0
                  }
                  locale={locale as Locales}
                />
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
              <LocalizedPrice
                price={calculateTotalPriceIncludingCleaningFee()}
                locale={locale as Locales}
              />
            </Body>
          </FlexBoxItem>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
