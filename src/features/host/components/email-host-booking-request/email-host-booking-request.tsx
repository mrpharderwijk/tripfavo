import { format, parseISO } from 'date-fns'
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
import { datePrices } from '@/data/date-prices'
import RootLayout from '@/emails/layout/root-layout'
import { GuestsAmount } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { PublicGuestUser } from '@/features/guest/types/guest-user'
import { PublicListing } from '@/features/listings/types/public-listing'
import { getCleaningFee } from '@/features/listings/utils/get-cleaning-fee'
import { getDeposit } from '@/features/listings/utils/get-deposit'
import { Locale } from '@/i18n/config'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export type EmailHostBookingRequestProps = {
  startDate: string
  endDate: string
  listing: PublicListing
  guestsAmount: GuestsAmount
  totalPrice: number
  locale: Locale
  guest: PublicGuestUser
}

export async function EmailHostBookingRequest({
  startDate,
  endDate,
  listing,
  guestsAmount,
  locale,
  guest,
}: EmailHostBookingRequestProps): Promise<ReactElement> {
  const tBookingDetailSummary = await getTranslations('bookingDetail.summary')
  const tBookingDetailSummaryDates = await getTranslations(
    'bookingDetail.summary.dates',
  )
  const tHostBookingEmailBookingRequest = await getTranslations(
    'host.bookings.email.bookingRequest',
  )
  const tBookingDetailSummaryGuests = await getTranslations(
    'bookingDetail.summary.guests',
  )
  const tBookingDetailPriceBreakdown = await getTranslations(
    'bookingDetail.priceBreakdown',
  )
  const previewText = tHostBookingEmailBookingRequest('previewText', {
    listingName: `<b>${listing?.location?.streetName ?? 'unknown street'} ${listing?.location?.houseNumber ?? ''}</b>`,
  })
  const parsedStartDate = parseISO(startDate)
  const parsedEndDate = parseISO(endDate)
  const formattedStartDate = format(parsedStartDate, 'dd-MM-yyyy', {
    locale: localeToDateFnsLocale(locale),
  })
  const formattedEndDate = format(parsedEndDate, 'dd-MM-yyyy', {
    locale: localeToDateFnsLocale(locale),
  })
  const totalPricePerNight = calculateTotalPricePerNight({
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    datePrices: datePrices,
  })
  const cleaningFee = getCleaningFee(listing.priceDetails)
  const deposit = getDeposit(listing.priceDetails)
  const totalPrice = calculateTotalPriceIncludingCleaningFee({
    priceDetails: listing.priceDetails,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    datePrices,
  })

  return (
    <RootLayout previewText={previewText}>
      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Row>
            <Heading>{tHostBookingEmailBookingRequest('heading')}</Heading>
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
              {tHostBookingEmailBookingRequest('description', {
                listingName: `<b>${listing?.location?.streetName ?? 'unknown city'} ${listing?.location?.houseNumber ?? ''}</b>`,
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
                src={listing?.images[0]?.url ?? ''}
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
                {formattedStartDate} - {formattedEndDate}
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

      <Hr className="my-[16px] border-gray-300 border-t-2" />

      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Heading as="h2">
            {tHostBookingEmailBookingRequest('whatsNext.heading')}
          </Heading>
          <Text>
            {tHostBookingEmailBookingRequest('whatsNext.description', {
              bookingsPage: `<Link href={'/host/bookings'}>bookings</Link>`,
            })}
          </Text>
        </Container>
      </Section>

      {[
        {
          number: 1,
          title: tHostBookingEmailBookingRequest('whatsNext.step1.title'),
          description: tHostBookingEmailBookingRequest(
            'whatsNext.step1.description',
          ),
        },
        {
          number: 2,
          title: tHostBookingEmailBookingRequest('whatsNext.step2.title'),
          description: tHostBookingEmailBookingRequest(
            'whatsNext.step2.description',
          ),
        },
      ].map((feature) => (
        <Section className="px-[24px]">
          <Container className="py-[16px]">
            <div className="inline-flex items-start">
              <div className="mr-[18px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white text-[12px] leading-none">
                {feature.number}
              </div>
              <div>
                <Heading
                  as="h2"
                  className="mt-[0px] mb-[8px] text-gray-900 text-[18px] leading-[28px]"
                >
                  {feature.title}
                </Heading>
                <Text className="m-0 text-gray-500 text-[14px] leading-[24px]">
                  {feature.description}
                </Text>
              </div>
            </div>
          </Container>
        </Section>
      ))}
    </RootLayout>
  )
}
