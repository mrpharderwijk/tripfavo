'use client'

import { ReactElement } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { BookingDetailBottomBar } from '@/features/bookings/booking-detail/components/booking-detail-bottom-bar/booking-detail-bottom-bar'
import { BookingDetailHostInfo } from '@/features/bookings/booking-detail/components/booking-detail-host-info/booking-detail-host-info'
import { BookingDetailPriceBreakdown } from '@/features/bookings/booking-detail/components/booking-detail-price-breakdown/booking-detail-price-breakdown'
import { BookingDetailProperty } from '@/features/bookings/booking-detail/components/booking-detail-property/booking-detail-property'
import { BookingDetailSuccessDialog } from '@/features/bookings/booking-detail/components/booking-detail-success-dialog/booking-detail-success-dialog'
import { BookingDetailSummary } from '@/features/bookings/booking-detail/components/booking-detail-summary/booking-detail-summary'
import { BookingDetailContextProvider } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { PublicProperty } from '@/features/properties/types/public-property'

type BookingDetailPageProps = {
  property: PublicProperty
  startDate: string
  endDate: string
  adultsAmount: number
  childrenAmount?: number
  infantsAmount?: number
  petsAmount?: number
}

export function BookingDetailPage({
  property,
  startDate,
  endDate,
  adultsAmount = 1,
  childrenAmount = 0,
  infantsAmount = 0,
  petsAmount = 0,
}: BookingDetailPageProps): ReactElement {
  return (
    <BookingDetailContextProvider
      property={property}
      startDate={startDate}
      endDate={endDate}
      guestsAmount={{
        adults: adultsAmount,
        children: childrenAmount,
        infants: infantsAmount,
        pets: petsAmount,
      }}
    >
      <FlexBox
        flex-direction="col"
        gap={6}
        padding-x={6}
        padding-top={6}
        padding-bottom={24}
      >
        <BookingDetailProperty />
        <Divider />

        <BookingDetailHostInfo />
        <Divider />

        <BookingDetailSummary />
        <Divider />

        <BookingDetailPriceBreakdown />

        {/* TODO: OPTIONAL */}
        {/* <BookingDetailCancellationDetails /> */}
        <BookingDetailBottomBar />

        <BookingDetailSuccessDialog />
      </FlexBox>
    </BookingDetailContextProvider>
  )
}
