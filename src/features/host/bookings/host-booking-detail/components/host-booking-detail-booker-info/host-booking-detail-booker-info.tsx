'use client'

import { ReactElement } from 'react'

import { UserInfo } from '@/components/organisms/user-info/user-info'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'

export function HostBookingDetailBookerInfo(): ReactElement {
  const { booking } = useHostBookingDetailContext()
  return (
    <UserInfo
      title={booking?.guest?.name?.firstName ?? ''}
      subtitle="1 month ago"
      imageUrl={booking?.guest?.profileImage?.url ?? '/placeholder.png'}
    />
  )
}
