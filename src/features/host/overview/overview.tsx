'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ReactElement, useEffect } from 'react'
import { ListingStatus } from '@prisma/client'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { ListingList } from '@/features/host/components/listing-list/listing-list'
import { HostListing } from '@/features/host/types/host-listing'
import {
  useAppContext,
  UserMode,
} from '@/providers/app-context-provider/app-context-provider'

type HostOverviewProps = {
  listings?: HostListing[] | null
}

export function HostOverview({ listings }: HostOverviewProps): ReactElement {
  const { enableAppLoading, disableAppLoading, setUserMode, userMode } =
    useAppContext()
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
    enableAppLoading('Creating your listing')
    try {
      const response = await axios.post('/api/host/listings')
      router.push(`/host/${response.data.id}/structure`)
    } catch (error) {
      console.error(error)
    } finally {
      disableAppLoading()
    }
  }

  useEffect(() => {
    if (userMode === UserMode.HOST) {
      return
    }

    setUserMode(UserMode.HOST)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <FlexBox flex-direction="col" gap={6}>
        <ListingList heading="Published listings" items={publishedListings} />
        <ListingList heading="Pending listings" items={pendingListings} />
      </FlexBox>

      <Button
        variant="secondary"
        rounded="lg"
        onClick={handleOnClickAddListing}
      >
        Add listing
      </Button>
    </>
  )
}
