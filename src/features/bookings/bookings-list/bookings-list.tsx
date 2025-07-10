import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { BookingsListItem } from '@/features/bookings/bookings-list/bookings-list-item'
import { useBookingsContext } from '@/features/bookings/providers/bookings-context-provider'

type BookingsListProps = {
  heading?: string
  urlBasePath: string
}

export function BookingsList({
  heading,
  urlBasePath,
}: BookingsListProps): ReactElement | null {
  const { bookings } = useBookingsContext()

  if (!bookings.length) {
    return null
  }

  return (
    <FlexBox flex-direction="col" gap={4}>
      {heading && (
        <Heading tag="h3" like="h6" color="primary" font-weight="bold">
          {heading}
        </Heading>
      )}

      <FlexBox flex-direction="col" gap={0} gap-md={2} fullWidth>
        {bookings.map((item) => (
          <BookingsListItem
            key={item.id}
            urlBasePath={urlBasePath}
            id={item.id}
            image={
              item.property.images.find((image) => image.isMain) ??
              item.property.images[0]
            }
            location={item.property.location}
            title={item.property.title}
            status={item.status}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        ))}
      </FlexBox>
    </FlexBox>
  )
}
