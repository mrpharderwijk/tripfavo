import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { SafeBooking } from '@/features/bookings/types/booking'
import { HostBookingListItem } from '@/features/host/bookings/host-bookings/components/host-bookings-list/host-bookings-list-item'

type BookingsListProps = {
  heading: string
  items: SafeBooking[]
}

export function BookingsList({
  heading,
  items,
}: BookingsListProps): ReactElement | null {
  if (!items.length) {
    return null
  }

  return (
    <FlexBox flex-direction="col" gap={4}>
      <Heading tag="h3" like="h6" color="primary" font-weight="bold">
        {heading}
      </Heading>

      {items.map((item) => (
        <HostBookingListItem
          key={item.id}
          id={item.id}
          image={item.listing.images[0]}
          title={item.listing.title}
          status={item.status}
          startDate={item.startDate}
          endDate={item.endDate}
        />
      ))}
    </FlexBox>
  )
}
