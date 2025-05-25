'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import { ListingFull } from '@/actions/get-listings-by-logged-in-user'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { ListingItem } from '@/features/host/components/listing-item/listing-item'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

type HostOverviewProps = {
  listings?: ListingFull[] | null
}

export function HostOverview({ listings }: HostOverviewProps) {
  const { enableAppLoading, disableAppLoading } = useAppContext()
  const router = useRouter()

  async function handleOnClickAddListing() {
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

  return (
    <>
      <FlexBox flex-direction="col" gap={3}>
        {!!listings?.length &&
          listings.map((listing) => (
            <ListingItem {...listing} data-testid={listing.id} key={listing.id} />
          ))}
      </FlexBox>
      <Button variant="quaternary" rounded="md" onClick={handleOnClickAddListing}>
        Add listing
      </Button>
    </>
  )
}
