import { parseISO } from 'date-fns'
import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import {
  Column,
  Container,
  Heading,
  Hr,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components'

import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import RootLayout from '@/emails/layout/root-layout'
import { GuestsAmount } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { PublicGuestUser } from '@/features/guest/types/guest-user'
import { SafeHostProperty } from '@/features/host/properties/types/safe-host-property'
import { PublicPropertyPriceDetail } from '@/features/properties/types/public-property'
import { getCleaningFee } from '@/features/properties/utils/get-cleaning-fee'
import { getDeposit } from '@/features/properties/utils/get-deposit'
import { Locale } from '@/i18n/config'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export type EmailHostBookingApprovalProps = {
  startDate: string
  endDate: string
  property: SafeHostProperty
  guestsAmount: GuestsAmount
  totalPrice: number
  locale: Locale
  guest: PublicGuestUser
  datePrices: DatePrice[]
  priceDetails: PublicPropertyPriceDetail[]
}

export async function EmailHostBookingApproval({
  startDate,
  endDate,
  property,
  guestsAmount,
  locale,
  guest,
  datePrices,
  priceDetails,
}: EmailHostBookingApprovalProps): Promise<ReactElement> {
  const tBookingDetailPriceBreakdown = await getTranslations(
    'bookingDetail.priceBreakdown',
  )
  const tBookingDetailSummaryGuests = await getTranslations(
    'bookingDetail.summary.guests',
  )
  const tBookingDetailSummaryDates = await getTranslations(
    'bookingDetail.summary.dates',
  )
  const tBookingDetailSummary = await getTranslations('bookingDetail.summary')
  const tHostBookingEmailBookingApproval = await getTranslations(
    'host.bookings.email.bookingApproval',
  )

  /**
   * Preview text
   */
  const previewText = tHostBookingEmailBookingApproval('previewText', {
    guestName: guest?.firstName ?? 'unknown guest',
  })

  /**
   * Dates
   */
  const parsedStartDate = parseISO(startDate)
  const parsedEndDate = parseISO(endDate)

  /**
   * Prices
   */
  const totalPricePerNight = calculateTotalPricePerNight({
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    datePrices: datePrices,
  })
  const cleaningFee = priceDetails ? getCleaningFee(priceDetails) : 0
  const deposit = priceDetails ? getDeposit(priceDetails) : 0
  const totalPrice = calculateTotalPriceIncludingCleaningFee({
    priceDetails: priceDetails ?? [],
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    datePrices,
  })

  /**
   * Images
   */
  const mainImageUrl = property.images?.find((image) => image.isMain)?.url ?? ''

  return (
    <RootLayout previewText={previewText}>
      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Row>
            <Heading>{tHostBookingEmailBookingApproval('heading')}</Heading>
          </Row>
          <Row align="center">
            <Column align="left" className="h-[48px] w-[48px]">
              <Img
                className="rounded-full aspect-square object-cover"
                src={guest?.profileImageUrl}
                alt={guest?.firstName}
                width={48}
                height={48}
              />
            </Column>
            <Column
              align="left"
              valign="top"
              className="h-[40px] w-auto pl-[16px]"
            >
              <Heading as="h4" className="mt-[4px] mb-[2px]">
                {guest?.firstName}
              </Heading>
              <Text className="text-xs text-gray-500 my-[0px]">
                {guest?.createdAt}
              </Text>
            </Column>
          </Row>
          <Row>
            <Text>
              {tHostBookingEmailBookingApproval('description', {
                propertyName: `<b>${property?.location?.streetName ?? 'unknown city'} ${property?.location?.houseNumber ?? ''}</b>`,
              })}
            </Text>
          </Row>
        </Container>
      </Section>

      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Row className="pb-[24px]">
            <Column align="left" className="h-[105px] w-[105px]">
              <Img
                className="rounded-2xl aspect-square object-cover"
                src={mainImageUrl}
                alt={property?.title ?? ''}
                width={105}
                height={105}
              />
            </Column>
            <Column
              align="left"
              valign="top"
              className="pl-[16px] h-[40px] w-auto"
            >
              <Text className="mt-[24px] mb-[8px] text-lg font-[800]">
                {property?.title}
              </Text>
              <Text className="text-md my-[0px] text-gray-500">
                {property?.location?.city}
              </Text>
            </Column>
          </Row>

          <Hr className="bg-[#DDDDDD] max-h-[1px] border-[0px] my-[0px]" />

          <Row className="pt-[24px]">
            <Column align="left">
              <Heading as="h2" className="my-[0px]">
                {tBookingDetailSummary('heading')}
              </Heading>
            </Column>
          </Row>
          <Row className="py-[24px]">
            <Column align="left">
              <Text className="text-md text-[#222222] font-[800] my-[0px]">
                {tBookingDetailSummaryDates('label')}
              </Text>
              <Text className="text-md text-[#222222] my-[0px]">
                {!!startDate && !!endDate && (
                  <LocalizedBookingDates
                    startDate={parsedStartDate}
                    endDate={parsedEndDate}
                    locale={locale as Locale}
                  />
                )}
              </Text>
            </Column>
          </Row>

          <Hr className="bg-[#DDDDDD] max-h-[1px] border-[0px] my-[0px]" />

          <Row className="py-[24px]">
            <Column align="left">
              <Text className="text-md text-[#222222] font-[800] my-[0px]">
                {tBookingDetailSummaryGuests('label')}
              </Text>
              <Text className="text-md text-[#222222] my-[0px]">
                {tBookingDetailSummaryGuests('value.adultsAmount', {
                  amount: guestsAmount?.adults ?? 0,
                })}
                ,{' '}
                {tBookingDetailSummaryGuests('value.childrenAmount', {
                  amount: guestsAmount?.children ?? 0,
                })}
                ,{' '}
                {tBookingDetailSummaryGuests('value.infantsAmount', {
                  amount: guestsAmount?.infants ?? 0,
                })}
                ,{' '}
                {tBookingDetailSummaryGuests('value.petsAmount', {
                  amount: guestsAmount?.pets ?? 0,
                })}
              </Text>
            </Column>
          </Row>

          <Hr className="bg-[#DDDDDD] max-h-[1px] border-[0px] my-[0px]" />

          <Row className="py-[24px]">
            <Column align="left">
              <Heading as="h2" className="my-[0px]">
                {tBookingDetailPriceBreakdown('heading')}
              </Heading>
            </Column>
          </Row>
          {totalPricePerNight?.map(({ nightAmount, pricePerNight, total }) => (
            <Row className="py-[0px]">
              <Column align="left">
                <Text className="text-md text-[#222222] my-[0px]">
                  <LocalizedPrice
                    price={pricePerNight}
                    locale={locale as Locale}
                  />{' '}
                  x{' '}
                  {tBookingDetailPriceBreakdown('nightAmount', {
                    amount: nightAmount,
                  })}
                </Text>
              </Column>
              <Column align="right">
                <Text className="text-md text-[#222222] my-[0px]">
                  <LocalizedPrice price={total} locale={locale} />
                </Text>
              </Column>
            </Row>
          ))}

          <Row className="py-[8px]">
            <Column align="left">
              <Text className="text-md text-[#222222] my-[0px]">
                {tBookingDetailPriceBreakdown('cleaningFee')}
              </Text>
            </Column>
            <Column align="right">
              <Text className="text-md text-[#222222] my-[0px]">
                <LocalizedPrice price={cleaningFee} locale={locale} />
              </Text>
            </Column>
          </Row>

          <Row className="py-[0px]">
            <Column align="left">
              <Text className="text-md text-[#222222] my-[0px]">
                {tBookingDetailPriceBreakdown('deposit')}
              </Text>
            </Column>
            <Column align="right">
              <Text className="text-md text-[#222222] my-[0px]">
                <LocalizedPrice price={deposit} locale={locale} />
              </Text>
            </Column>
          </Row>

          <Hr className="bg-[#DDDDDD] max-h-[1px] border-[0px] my-[16px]" />

          <Row className="py-[0px]">
            <Column align="left">
              <Text className="text-md text-[#222222] font-[800] my-[0px]">
                {tBookingDetailPriceBreakdown('total')}
              </Text>
            </Column>
            <Column align="right">
              <Text className="text-md text-[#222222] font-[800] my-[0px]">
                <LocalizedPrice price={totalPrice} locale={locale} />
              </Text>
            </Column>
          </Row>
        </Container>
      </Section>
    </RootLayout>
  )
}
