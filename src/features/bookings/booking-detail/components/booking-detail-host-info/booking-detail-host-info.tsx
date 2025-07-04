import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { UserInfo } from '@/components/organisms/user-info/user-info'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'

export function BookingDetailHostInfo(): ReactElement {
  const {
    property: { host },
  } = useBookingDetailContext()
  const tBookingDetailHostInfo = useTranslations('bookingDetail')

  return (
    <UserInfo
      title={tBookingDetailHostInfo('host.label', {
        name: host.name?.firstName ?? '',
      })}
      subtitle="1 month ago"
      imageUrl={host.profileImage ?? '/placeholder.png'}
    />
  )
}
