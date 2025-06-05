'use client'

import { ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailTitle(): ReactElement | null {
  const {
    listing: { title },
  } = useListingDetailContext()

  if (!title) {
    return null
  }

  return (
    <Heading tag="h1" like="h2-semibold" text-align="center">
      {title}
    </Heading>
  )
}
