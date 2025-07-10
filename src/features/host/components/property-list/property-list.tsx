import { parse } from 'date-fns'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DATE_FORMAT_DB } from '@/constants/dates'
import { SortEnum } from '@/features/host/bookings/host-bookings/components/host-bookings-overview/host-bookings-overview'
import { PropertyItem } from '@/features/host/components/property-list/property-list-item'
import { SafeHostProperty } from '@/features/host/properties/types/safe-host-property'

type PropertyListProps = {
  heading: string
  items?: SafeHostProperty[]
  sort?: SortEnum
}

export function PropertyList({
  items,
  heading,
  sort = SortEnum.DESC,
}: PropertyListProps): ReactElement | null {
  if (!items?.length) {
    return null
  }

  const sortedItems = items.sort((a, b) => {
    const dateA = parse(a.createdAt, DATE_FORMAT_DB, new Date()).getTime()
    const dateB = parse(b.createdAt, DATE_FORMAT_DB, new Date()).getTime()

    if (sort === SortEnum.ASC) {
      return dateA - dateB
    }
    return dateB - dateA
  })

  return (
    <FlexBox flex-direction="col" gap={4}>
      <Heading tag="h3" like="h6" color="primary" font-weight="bold">
        {heading}
      </Heading>

      {sortedItems.map((item) => (
        <PropertyItem key={item.id} {...item} />
      ))}
    </FlexBox>
  )
}
