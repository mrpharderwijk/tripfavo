'use client'

import { ReactElement, useRef } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { ListingDetailAbout } from '@/features/listings/listing-detail/components/listing-detail-about/listing-detail-about'
import { ListingDetailAmenities } from '@/features/listings/listing-detail/components/listing-detail-amenities/listing-detail-amenities'
import { ListingDetailBottomBar } from '@/features/listings/listing-detail/components/listing-detail-bottom-bar/listing-detail-bottom-bar'
import { ListingDetailDatePicker } from '@/features/listings/listing-detail/components/listing-detail-date-picker/listing-detail-date-picker'
import { ListingDetailHostInfo } from '@/features/listings/listing-detail/components/listing-detail-host-info/listing-detail-host-info'
import { ListingDetailLocation } from '@/features/listings/listing-detail/components/listing-detail-location/listing-detail-location'
import { ListingDetailSlider } from '@/features/listings/listing-detail/components/listing-detail-slider/listing-detail-slider'
import { ListingDetailSubtitle } from '@/features/listings/listing-detail/components/listing-detail-subtitle/listing-detail-subtitle'
import { ListingDetailTitle } from '@/features/listings/listing-detail/components/listing-detail-title/listing-detail-title'
import { ListingDetailContextProvider } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { PublicListing } from '@/features/listings/types/public-listing'

type ListingDetailPageProps = {
  listing: PublicListing
}

export function ListingDetailPage({
  listing,
}: ListingDetailPageProps): ReactElement {
  const datePickerRef = useRef<HTMLDivElement | null>(null)

  return (
    <ListingDetailContextProvider listing={listing}>
      <FlexBox flex-direction="col" gap={6}>
        <ListingDetailSlider />

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
              <ListingDetailTitle />
              <ListingDetailSubtitle />
            </FlexBox>

            {/* <ListingDetailFloorPlan /> */}
            <ListingDetailHostInfo />
            <ListingDetailAbout />
            <Divider />
            <ListingDetailLocation />
            <Divider />
            <ListingDetailAmenities />
            <Divider />
            <div ref={datePickerRef}>
              <ListingDetailDatePicker />
            </div>
            <ListingDetailBottomBar datePickerRef={datePickerRef} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ListingDetailContextProvider>
  )
}
