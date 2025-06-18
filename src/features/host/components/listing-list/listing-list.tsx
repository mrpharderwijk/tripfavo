import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ListingItem } from '@/features/host/components/listing-list/listing-list-item'
import { HostListing } from '@/features/host/types/host-listing'

type ListingListProps = {
  heading: string
  items?: HostListing[]
}

export function ListingList({
  items,
  heading,
}: ListingListProps): ReactElement | null {
  if (!items?.length) {
    return null
  }

  return (
    <FlexBox flex-direction="col" gap={4}>
      <Heading tag="h3" like="h6" color="primary" font-weight="bold">
        {heading}
      </Heading>

      {items.map((item) => (
        <ListingItem key={item.id} {...item} />
      ))}
    </FlexBox>
  )
}
