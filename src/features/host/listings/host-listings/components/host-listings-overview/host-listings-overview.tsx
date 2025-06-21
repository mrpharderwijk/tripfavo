'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { ListingStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { ListingList } from '@/features/host/components/listing-list/listing-list'
import { HostListing } from '@/features/host/types/host-listing'

export function HostListingsOverview({
  listings,
}: {
  listings: HostListing[]
}): ReactElement {
  const router = useRouter()
  const pendingListings = listings?.filter(
    (listing) => listing.status === ListingStatus.DRAFT,
  )
  const publishedListings = listings?.filter(
    (listing) => listing.status === ListingStatus.PUBLISHED,
  )

  // TODO: Add archived listings
  // const archivedListings = listings?.filter(
  //   (listing) => listing.status === ListingStatus.ARCHIVED,
  // )

  async function handleOnClickAddListing(): Promise<void> {
    try {
      const response = await axios.post('/api/host/listings')
      router.push(`/host/${response.data.id}/structure`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FlexBox flex-direction="col" gap={6}>
      <ListingList heading="Published listings" items={publishedListings} />
      <ListingList heading="Pending listings" items={pendingListings} />

      <Button
        variant="secondary"
        rounded="lg"
        onClick={handleOnClickAddListing}
      >
        Add listing
      </Button>
    </FlexBox>
  )
}
