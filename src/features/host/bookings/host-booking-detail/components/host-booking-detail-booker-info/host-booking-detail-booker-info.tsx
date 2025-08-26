'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { UserInfo } from '@/components/organisms/user-info/user-info'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'

export function HostBookingDetailBookerInfo(): ReactElement {
  const { booking } = useHostBookingDetailContext()
  const tHostBookingDetail = useTranslations('host.bookings.bookingDetail')

  return (
    <FlexBox flex-direction="col" gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tHostBookingDetail('bookerInfo.heading')}
      </Heading>
      <UserInfo
        title={booking?.guest?.name?.firstName ?? ''}
        subtitle="1 month ago"
        imageUrl={booking?.guest?.profileImage?.url ?? '/placeholder.png'}
      />
    </FlexBox>
  )
}
