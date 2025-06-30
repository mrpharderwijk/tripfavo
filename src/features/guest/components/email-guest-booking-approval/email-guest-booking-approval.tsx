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
import { GuestsAmount } from '@/features/guest/bookings/guest-booking-detail/providers/guest-booking-detail-context-provider'
import { PublicGuestUser } from '@/features/guest/types/guest-user'
import { SafeHostListing } from '@/features/host/listings/types/safe-host-listing'
import { PublicListingPriceDetail } from '@/features/listings/types/public-listing'
import { getCleaningFee } from '@/features/listings/utils/get-cleaning-fee'
import { getDeposit } from '@/features/listings/utils/get-deposit'
import { Locale } from '@/i18n/config'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export type EmailGuestBookingApprovalProps = {
  startDate: string
  endDate: string
  listing: SafeHostListing
  guestsAmount: GuestsAmount
  totalPrice: number
  locale: Locale
  guest: PublicGuestUser
  datePrices: DatePrice[]
  priceDetails: PublicListingPriceDetail[]
}

export async function EmailGuestBookingApproval({
  startDate,
  endDate,
  listing,
  guestsAmount,
  locale,
  datePrices,
  priceDetails,
}: EmailGuestBookingApprovalProps): Promise<ReactElement> {
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
  const tGuestBookingEmailBookingApproval = await getTranslations(
    'guest.bookings.email.bookingApproval',
  )

  /**
   * Preview text
   */
  const previewText = tGuestBookingEmailBookingApproval('previewText', {
    hostName: listing?.host?.name?.firstName ?? 'the host',
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
  const mainImageUrl = listing.images?.find((image) => image.isMain)?.url ?? ''

  return (
    <RootLayout previewText={previewText}>
      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Heading>{tGuestBookingEmailBookingApproval('heading')}</Heading>
          <Text>
            {tGuestBookingEmailBookingApproval('description', {
              listingName: `<b>${listing?.location?.streetName ?? 'unknown city'} ${listing?.location?.houseNumber ?? ''}</b>`,
            })}
          </Text>
        </Container>
      </Section>

      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Row className="pb-[24px]">
            <Column align="left" className="h-[105px] w-[105px]">
              <Img
                className="rounded-2xl aspect-square object-cover"
                src={mainImageUrl}
                alt={listing?.title ?? ''}
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
                {listing?.title}
              </Text>
              <Text className="text-md my-[0px] text-gray-500">
                {listing?.location?.city}
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
                  amount: guestsAmount?.adults ?? 1,
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
