'use client'

import { ReactElement, useRef } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { PropertyDetailAbout } from '@/features/properties/property-detail/components/property-detail-about/property-detail-about'
import { PropertyDetailAmenities } from '@/features/properties/property-detail/components/property-detail-amenities/property-detail-amenities'
import { PropertyDetailBottomBar } from '@/features/properties/property-detail/components/property-detail-bottom-bar/property-detail-bottom-bar'
import { PropertyDetailDatePicker } from '@/features/properties/property-detail/components/property-detail-date-picker/property-detail-date-picker'
import { PropertyDetailHostInfo } from '@/features/properties/property-detail/components/property-detail-host-info/property-detail-host-info'
import { PropertyDetailLocation } from '@/features/properties/property-detail/components/property-detail-location/property-detail-location'
import { PropertyDetailSlider } from '@/features/properties/property-detail/components/property-detail-slider/property-detail-slider'
import { PropertyDetailSubtitle } from '@/features/properties/property-detail/components/property-detail-subtitle/property-detail-subtitle'
import { PropertyDetailTitle } from '@/features/properties/property-detail/components/property-detail-title/property-detail-title'
import { PropertyDetailContextProvider } from '@/features/properties/property-detail/providers/property-detail-context-provider'
import { PublicProperty } from '@/features/properties/types/public-property'

type PropertyDetailPageProps = {
  property: PublicProperty
}

export function PropertyDetailPage({
  property,
}: PropertyDetailPageProps): ReactElement {
  const datePickerRef = useRef<HTMLDivElement | null>(null)

  return (
    <PropertyDetailContextProvider property={property}>
      <FlexBox flex-direction="col" gap={6}>
        <PropertyDetailSlider />

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
              <PropertyDetailTitle />
              <PropertyDetailSubtitle />
            </FlexBox>
            <Divider />

            {/* <PropertyDetailFloorPlan /> */}
            <PropertyDetailHostInfo />
            <Divider />

            <PropertyDetailAbout />
            <Divider />

            <PropertyDetailLocation />
            <Divider />

            <PropertyDetailAmenities />
            <Divider />

            <div ref={datePickerRef}>
              <PropertyDetailDatePicker />
            </div>

            <PropertyDetailBottomBar datePickerRef={datePickerRef} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </PropertyDetailContextProvider>
  )
}
