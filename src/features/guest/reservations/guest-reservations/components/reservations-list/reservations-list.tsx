import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ReservationItem } from '@/features/guest/reservations/guest-reservations/components/reservations-list/reservation-list-item'
import { GuestReservation } from '@/features/guest/types/guest-reservation'

type ReservationsListProps = {
  heading: string
  items: GuestReservation[]
}

export function ReservationsList({
  heading,
  items,
}: ReservationsListProps): ReactElement | null {
  if (!items.length) {
    return null
  }

  return (
    <FlexBox flex-direction="col" gap={4}>
      <Heading tag="h3" like="h6" color="primary" font-weight="bold">
        {heading}
      </Heading>

      {items.map((item) => (
        <ReservationItem
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
