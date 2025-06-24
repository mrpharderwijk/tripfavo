import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { ListMediaItemTitle } from '@/components/organisms/list-media-item/list-media-item-title'
import { BookingCardStatusEnum } from '@/features/bookings/bookings-list/booking-card-status'
import { BookingCardStatus } from '@/features/bookings/bookings-list/booking-card-status'

type BookingCardProps = {
  href: string
  status: BookingCardStatusEnum
  image: { url: string; fileName: string } | null
  title: string
  subtitle: string
}

export function BookingCard({
  href,
  status,
  image,
  title,
}: BookingCardProps): ReactElement {
  return (
    <FlexBox
      flex-direction="row"
      gap={4}
      fullWidth
      border-color="deco"
      border-t={0}
      border-t-md={1}
      border-l={0}
      border-l-md={1}
      border-r={0}
      border-r-md={1}
      border={1}
      border-radius="none"
      border-radius-md="2xl"
      overflow="hidden"
    >
      <Link
        href={href}
        className="relative hover:bg-bg-secondary focus:bg-bg-secondary cursor-pointer w-full"
      >
        <FlexBox
          flex-direction="row"
          align-items="start"
          gap={4}
          padding-y={4}
          padding-x={4}
          padding-md={4}
        >
          <FlexBoxItem flex="initial">
            <Box
              width={16}
              width-sm={20}
              width-md={28}
              height={16}
              height-sm={20}
              height-md={28}
            >
              {status && <BookingCardStatus status={status} />}
              {!!image && (
                <Image
                  src={image?.url}
                  alt={image?.fileName}
                  width={112}
                  height={112}
                  className="object-cover aspect-square rounded-xl"
                />
              )}
            </Box>
          </FlexBoxItem>

          <FlexBox
            flex-direction="col"
            gap={2}
            align-items="start"
            justify-content="center"
          >
            <ListMediaItemTitle title={title} />
            {/* <ListMediaItemSubTitle subtitle={subtitle} /> */}

            <FlexBoxItem flex-direction="row" gap={2} fullWidth>
              <FlexBoxItem flex-direction="col" flex-basis="1/2" gap={1}>
                <Body size="base-xs" color="secondary">
                  Check in
                </Body>
                <Body size="base-xs" color="primary" font-weight="semibold">
                  22 September 2025
                </Body>
              </FlexBoxItem>
              <FlexBoxItem flex-direction="col" flex-basis="1/2" gap={1}>
                <Body size="base-xs" color="secondary">
                  Check Out
                </Body>
                <Body size="base-xs" color="primary" font-weight="semibold">
                  31 September 2025
                </Body>
              </FlexBoxItem>
            </FlexBoxItem>
          </FlexBox>
        </FlexBox>
      </Link>
    </FlexBox>
  )
}
