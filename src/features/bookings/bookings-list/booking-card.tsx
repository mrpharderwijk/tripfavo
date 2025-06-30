'use client'

import { format } from 'date-fns'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { ListMediaItemTitle } from '@/components/organisms/list-media-item/list-media-item-title'
import { DATE_FORMAT_BOOKING_DATE } from '@/constants/dates'
import { BookingCardStatusEnum } from '@/features/bookings/bookings-list/booking-card-status'
import { BookingCardStatus } from '@/features/bookings/bookings-list/booking-card-status'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type BookingCardProps = {
  href: string
  status: BookingCardStatusEnum
  image: { url: string; fileName: string } | null
  title: string
  location: string
  checkInDate: string
  checkOutDate: string
  totalPrice: string
  nights: number
}

export function BookingCard({
  href,
  status,
  image,
  title,
  location,
  checkInDate,
  checkOutDate,
  totalPrice,
  nights,
}: BookingCardProps): ReactElement {
  const locale = useLocale()

  const startDateFormatted = format(checkInDate, DATE_FORMAT_BOOKING_DATE, {
    locale: localeToDateFnsLocale(locale),
  })
  const endDateFormatted = format(checkOutDate, DATE_FORMAT_BOOKING_DATE, {
    locale: localeToDateFnsLocale(locale),
  })

  return (
    <Link
      href={href}
      className="relative hover:bg-bg-secondary focus:bg-bg-secondary cursor-pointer w-full"
    >
      <FlexBox
        flex-direction="row"
        gap={4}
        fullWidth
        border-color="deco"
        border={1}
        border-radius="2xl"
        overflow="hidden"
      >
        <FlexBox
          flex-direction="col"
          flex-direction-sm="row"
          align-items="stretch"
          gap={4}
          fullWidth
        >
          <FlexBoxItem flex="initial" padding-left-sm={3} padding-y-sm={3}>
            <Box
              fullWidth
              height={52}
              height-sm={32}
              width-sm={32}
              border-radius-sm="lg"
              overflow-sm="hidden"
            >
              {status && <BookingCardStatus status={status} />}
              {!!image && (
                <Image
                  src={image?.url}
                  alt={image?.fileName}
                  width={320}
                  height={320}
                  className="object-cover aspect-square w-full h-full"
                />
              )}
            </Box>
          </FlexBoxItem>

          <FlexBoxItem
            flex="auto"
            flex-direction="col"
            gap={4}
            align-items="start"
            justify-content="start"
            padding-x={4}
            padding-bottom={4}
            padding-y-sm={3}
            padding-left-sm={0}
            padding-right-sm={3}
          >
            <FlexBoxItem flex="auto" flex-direction="col" gap={2}>
              <ListMediaItemTitle title={title} />
              <FlexBox flex-direction="row" gap={1} align-items="start">
                <MapPin size={16} />
                <Body size="base-sm" color="secondary" font-weight="semibold">
                  {!!location && location}
                </Body>
              </FlexBox>
            </FlexBoxItem>

            {/* <ListMediaItemSubTitle subtitle={subtitle} /> */}

            <FlexBoxItem
              flex="initial"
              flex-direction="row"
              gap={2}
              fullWidth
              max-width="full"
            >
              <FlexBoxItem flex-direction="col" flex-basis="1/2" gap={1}>
                <Body size="base-sm" color="secondary" font-weight="semibold">
                  Check in
                </Body>
                <Body size="base-sm" color="primary" font-weight="bold">
                  {/* {startDateFormatted}  */}
                  31 September 2025
                </Body>
              </FlexBoxItem>
              <FlexBoxItem flex-direction="col" flex-basis="1/2" gap={1}>
                <Body
                  size="base-sm"
                  color="secondary"
                  font-weight="semibold"
                  text-align="right"
                >
                  Check Out
                </Body>
                <Body
                  size="base-sm"
                  color="primary"
                  font-weight="bold"
                  text-align="right"
                >
                  {/* {endDateFormatted}  */}
                  31 September 2025
                </Body>
              </FlexBoxItem>
            </FlexBoxItem>
          </FlexBoxItem>

          {/* <Display show-sm>
            <FlexBoxItem flex="initial" padding-right-sm={3} padding-y-sm={3}>
              $ 300 <br />
              per night
            </FlexBoxItem>
          </Display> */}
        </FlexBox>
      </FlexBox>
    </Link>
  )
}
