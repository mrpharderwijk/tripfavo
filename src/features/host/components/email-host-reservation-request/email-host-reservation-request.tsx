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
import { Locales } from '@/i18n/routing'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'
import { calculateTotalPriceIncludingCleaningFee } from '@/utils/pricing/calculate-total-price'
import { calculateTotalPricePerNight } from '@/utils/pricing/calculate-total-price-per-night'

export type EmailHostReservationRequestProps = {
  startDate: string
  endDate: string
  listing: PublicListing
  guestsAmount: GuestsAmount
  totalPrice: number
  locale: Locales
  guest: PublicGuestUser
}

export function EmailHostReservationRequest({
  startDate,
  endDate,
  listing,
  guestsAmount,
  locale,
  guest,
}: EmailHostReservationRequestProps): ReactElement {
  const previewText = `New reservation for ${listing?.location?.streetName ?? 'unknown street'} ${listing?.location?.houseNumber ?? ''}`
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
            <Heading>Reservation request by</Heading>
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
              A reservation request has been received for{' '}
              <i>
                {listing?.location?.streetName ?? 'unknown city'}{' '}
                {listing?.location?.houseNumber ?? ''}
              </i>
              . The guest has received a confirmation email of their reservation
              request. Until that time the reservation is pending.
              <br />
              <br />
              We kindly ask you to review the reservation request within 48
              hours or we will automatically accept it.
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
          title: 'You will need to review the reservation request',
          description:
            'In order to accept your reservation request, you will need to review the reservation request and confirm the reservation.',
        },
        {
          number: 2,
          title: 'When you accept the reservation',
          description:
            'Once you accepts the reservation, you can communicate with the guest by clicking the reservation and using the chat.',
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
