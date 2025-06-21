import { format, parseISO } from 'date-fns'
import { ReactElement } from 'react'
import {
  Column,
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components'

import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { datePrices } from '@/data/date-prices'
import RootLayout from '@/emails/layout/root-layout'
import { PublicGuestUser } from '@/features/guest/types/guest-user'
import { PublicListing } from '@/features/listings/types/public-listing'
import { getCleaningFee } from '@/features/listings/utils/get-cleaning-fee'
import { getDeposit } from '@/features/listings/utils/get-deposit'
import { GuestsAmount } from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'
import { Locale } from '@/i18n/config'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export type EmailGuestReservationRequestProps = {
  startDate: string
  endDate: string
  listing: PublicListing
  guestsAmount: GuestsAmount
  totalPrice: number
  locale: Locale
  guest: PublicGuestUser
}

export function EmailGuestReservationRequest({
  startDate,
  endDate,
  listing,
  guestsAmount,
  locale,
}: EmailGuestReservationRequestProps): ReactElement {
  const previewText = `Your reservation for ${listing?.location?.city ?? 'unknown city'}`
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
          <Heading>Reservation request</Heading>
          <Text>
            Your reservation request for{' '}
            <i>{listing?.location?.city ?? 'unknown city'}</i> has been sent to
            the host. The host will review your reservation and get back to you
            as soon as possible.
          </Text>
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
                Summary
              </Heading>
            </Column>
          </Row>
          <Row className="py-[24px]">
            <Column align="left">
              <Text className="text-md text-[#222222] font-[800] my-[0px]">
                Dates
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
                Guests
              </Text>
              <Text className="text-md text-[#222222] my-[0px]">
                {guestsAmount?.adults ?? 0} adults,{' '}
                {guestsAmount?.children ?? 0} children,{' '}
                {guestsAmount?.infants ?? 0} infants, {guestsAmount?.pets ?? 0}{' '}
                pets
              </Text>
            </Column>
          </Row>

          <Hr className="bg-[#DDDDDD] max-h-[1px] border-[0px] my-[0px]" />

          <Row className="py-[24px]">
            <Column align="left">
              <Heading as="h2" className="my-[0px]">
                Price details
              </Heading>
            </Column>
          </Row>
          {totalPricePerNight?.map(({ nightAmount, pricePerNight, total }) => (
            <Row className="py-[0px]">
              <Column align="left">
                <Text className="text-md text-[#222222] my-[0px]">
                  {pricePerNight} x {nightAmount} nights
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
                Cleaning fee
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
              <Text className="text-md text-[#222222] my-[0px]">Deposit</Text>
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
                Total price
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

      {/* <Section className="px-[24px]">
        <Container className="border-t-[1px] border-b-[1px] border-solid border-gray-200 py-[16px]">
          <Row>
            <Column align="left" className="h-[48px] w-[48px]">
              <Img className="rounded-full aspect-square object-cover" src={host?.profileImageUrl} alt={host?.firstName} width={48} height={48} />
            </Column>
            <Column align="left" valign='top' className="h-[40px] w-auto pl-[16px]">
              <Heading as="h4" className="mt-[4px] mb-[2px]">Hosted by {host?.firstName}</Heading>
              <Text className="text-xs text-gray-500 my-[0px]">Member for 1 month</Text>
            </Column>
          </Row>
        </Container>
      </Section> */}

      <Hr className="my-[16px] border-gray-300 border-t-2" />

      <Section className="px-[24px]">
        <Container className="py-[16px]">
          <Heading as="h2">What's next?</Heading>
          <Text>
            You can check the status of your reservation at any time in your{' '}
            <Link href={`/guest/reservations`}>reservations</Link> page.
          </Text>
        </Container>
      </Section>

      {[
        {
          number: 1,
          title:
            'The host of the property will review your reservation request',
          description:
            'In order to accept your reservation request, the host will need to review your request and confirm the reservation.',
        },
        {
          number: 2,
          title: 'The host accepts your reservation',
          description:
            'Once the host accepts your reservation, you will receive a confirmation email and you can start preparing for your stay.',
        },
        {
          number: 3,
          title: 'After the host accepts your reservation',
          description:
            'When your reservation is confirmed, you can communicate with the host by clicking on your reservation and using the chat.',
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
