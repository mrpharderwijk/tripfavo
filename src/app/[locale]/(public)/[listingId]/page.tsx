import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { Display } from '@/components/atoms/display/display'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { DotList } from '@/components/organisms/dot-list/dot-list'
import { DotListItem } from '@/components/organisms/dot-list/dot-list-item'
import { getPublishedListing } from '@/features/listings/actions/get-listings'
import { ListingDetailAbout } from '@/features/listings/components/listing-detail-about/listing-detail-about'
import { ListingDetailDatePicker } from '@/features/listings/components/listing-detail-date-picker/listing-detail-date-picker'
import { ListingDetailMap } from '@/features/listings/components/listing-detail-map/listing-detail-map'
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
          gap={10}
          border-radius-tl="3xl"
          border-radius-tr="3xl"
          padding={6}
          background-color="white"
          margin-top-negative={12}
        >
          <FlexBox flex-direction="col" gap={6}>
            {/* Title */}
            <Heading tag="h1" like="h2-semibold" text-align="center">
              {listing.title}
            </Heading>

            {/* Structure & FloorPlan */}
            <FlexBox flex-direction="col" gap={2}>
              <Body color="secondary" size="base-md" text-align="center">
                {tListing('description.title', {
                  structure: tListing(`structure.${listing.structure}`),
                  city: listing?.location?.city ?? '',
                })}
              </Body>

              <FlexBoxItem display="flex" align-items="center" justify-content="center">
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

          {/* Host Info */}
          <FlexBox
            flex-direction="row"
            align-items="center"
            justify-content="start"
            gap={4}
            border-t={1}
            border-b={1}
            border-color="tertiary"
            padding-y={4}
          >
            <FlexBoxItem flex="initial">
              <Image
                className="aspect-square rounded-full object-cover"
                src={listing.host.profileImage ?? '/placeholder.png'}
                alt={listing.host.name?.firstName ?? ''}
                width={48}
                height={48}
              />
            </FlexBoxItem>
            <FlexBoxItem display="flex" flex-direction="col" gap={1} flex="auto">
              <Heading tag="h3" like="h5-semibold">
                {tListing('host.label')} {listing.host.name?.firstName}
              </Heading>
              <Body color="secondary" size="base-md">
                1 month ago
              </Body>
            </FlexBoxItem>
          </FlexBox>

          {/* About Property */}
          <ListingDetailAbout heading={tListing('about.label')} description={listing.description} />

          {/* Map */}
          {listing?.location?.latitude && listing?.location?.longitude && (
            <ListingDetailMap
              heading={tListing('location.label')}
              latitude={listing?.location?.latitude}
              longitude={listing?.location?.longitude}
            />
          )}

          <ListingDetailDatePicker heading={tListing('dates.label')} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
