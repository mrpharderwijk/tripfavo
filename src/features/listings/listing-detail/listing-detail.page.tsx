import { Display } from '@/components/atoms/display/display'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { ListingDetailAbout } from '@/features/listings/listing-detail/components/listing-detail-about/listing-detail-about'
import { ListingDetailAmenities } from '@/features/listings/listing-detail/components/listing-detail-amenities/listing-detail-amenities'
import { ListingDetailDatePicker } from '@/features/listings/listing-detail/components/listing-detail-date-picker/listing-detail-date-picker'
import { ListingDetailDivider } from '@/features/listings/listing-detail/components/listing-detail-divider/listing-detail-divider'
import { ListingDetailHostInfo } from '@/features/listings/listing-detail/components/listing-detail-host-info/listing-detail-host-info'
import { ListingDetailLocation } from '@/features/listings/listing-detail/components/listing-detail-location/listing-detail-location'
import { ListingDetailSlider } from '@/features/listings/listing-detail/components/listing-detail-slider/listing-detail-slider'
import { ListingDetailSubtitle } from '@/features/listings/listing-detail/components/listing-detail-subtitle/listing-detail-subtitle'
import { ListingDetailTitle } from '@/features/listings/listing-detail/components/listing-detail-title/listing-detail-title'
import { ListingHeader } from '@/features/listings/listing-detail/components/listing-header/listing-header'
import { ListingDetailContextProvider } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { PublicListing } from '@/features/listings/types/public-listing'

type ListingDetailPageProps = {
  listing: PublicListing
}

export function ListingDetailPage({ listing }: ListingDetailPageProps) {
  return (
    <ListingDetailContextProvider listing={listing}>
      <FlexBox flex-direction="col" gap={6}>
        {/* Header (only on desktop) */}
        <Display show-lg>
          <Container narrow="lg">
            <ListingHeader title={listing.title ?? ''} />
          </Container>
        </Display>

        {/* Slider */}
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
              {/* Title */}
              <ListingDetailTitle />

              {/* Structure & FloorPlan */}
              <ListingDetailSubtitle />
            </FlexBox>

            {/* Host Info */}
            <ListingDetailHostInfo />

            {/* About Property */}
            <ListingDetailAbout />

            {/* Divider */}
            <ListingDetailDivider />

            {/* Map */}
            <ListingDetailLocation />

            {/* Divider */}
            <ListingDetailDivider />

            {/* Amenities */}
            <ListingDetailAmenities />

            {/* Divider */}
            <ListingDetailDivider />

            {/* Date Picker */}
            <ListingDetailDatePicker />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ListingDetailContextProvider>
  )
}
