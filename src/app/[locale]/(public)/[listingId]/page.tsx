import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { getPublishedListing } from '@/features/listings/actions/get-listings'
import { ListingDescription } from '@/features/listings/components/listing-description/listing-description'
import { ListingHeader } from '@/features/listings/components/listing-header/listing-header'
import { ListingImages } from '@/features/listings/components/listing-images/listing-images'

type ListingPageProps = {
  params: Promise<{ listingId: string }>
}

export default async function ListingPage({ params }: ListingPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getPublishedListing(listingId)

  if (!listing) {
    notFound()
  }

  return (
    <Container narrow="lg">
      <FlexBox flex-direction="col" gap={6}>
        <ListingHeader title={listing.title ?? ''} />
        <ListingImages images={listing?.images ?? []} />

        <FlexBox flex-direction="col" flex-direction-md="row" gap={6}>
          <ListingDescription
            structure={listing.structure}
            city={listing.location?.city ?? ''}
            floorPlan={listing.floorPlan}
          />
        </FlexBox>
      </FlexBox>
    </Container>
  )
}
