import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { Display } from '@/components/atoms/display/display'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DotList } from '@/components/organisms/dot-list/dot-list'
import { DotListItem } from '@/components/organisms/dot-list/dot-list-item'
import { getPublishedListing } from '@/features/listings/actions/get-listings'
import { ListingHeader } from '@/features/listings/components/listing-header/listing-header'
import { ListingImages } from '@/features/listings/components/listing-images/listing-images'

type ListingPageProps = {
  params: Promise<{ listingId: string }>
}

export default async function ListingPage({ params }: ListingPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getPublishedListing(listingId)
  const tListing = await getTranslations('listing')
  const tCommon = await getTranslations('common')

  if (!listing) {
    notFound()
  }

  return (
    <FlexBox flex-direction="col" gap={6}>
      <Display show-lg>
        <Container narrow="lg">
          <ListingHeader title={listing.title ?? ''} />
        </Container>
      </Display>

      <ListingImages images={listing?.images ?? []} />

      <FlexBox flex-direction="col" flex-direction-md="row" gap={6}>
        <FlexBox
          bg-color="primary"
          flex-direction="col"
          gap={2}
          border-radius-tl="3xl"
          border-radius-tr="3xl"
          padding={6}
          background-color="white"
          margin-top-negative={12}
        >
          <FlexBoxItem>
            <Heading tag="h2" like="h2-semibold" text-align="center">
              {listing.title}
              {/* {tListing('description.title', {
                structure: tListing(`structure.${listing.structure}`),
                city: listing?.location?.city ?? '',
              })} */}
            </Heading>
          </FlexBoxItem>
          <FlexBoxItem>
            <DotList>
              <DotListItem>
                {tCommon('guestCount', { amount: listing?.floorPlan?.guestCount ?? 0 })}
              </DotListItem>
              <DotListItem>
                {tCommon('roomCount', { amount: listing?.floorPlan?.roomCount ?? 0 })}
              </DotListItem>
              <DotListItem>
                {tCommon('bedroomCount', { amount: listing?.floorPlan?.bedroomCount ?? 0 })}
              </DotListItem>
              <DotListItem>
                {tCommon('bedCount', { amount: listing?.floorPlan?.bedCount ?? 0 })}
              </DotListItem>
              <DotListItem last>
                {tCommon('bathroomCount', { amount: listing?.floorPlan?.bathroomCount ?? 0 })}
              </DotListItem>
            </DotList>
          </FlexBoxItem>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
