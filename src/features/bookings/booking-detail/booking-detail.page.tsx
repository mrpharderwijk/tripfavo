'use client'

import { useSearchParams } from 'next/navigation'
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
}

export function BookingDetailPage({
  property,
}: BookingDetailPageProps): ReactElement {
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const adultsAmount = searchParams.get('adults')
  const childrenAmount = searchParams.get('children')
  const infantsAmount = searchParams.get('infants')
  const petsAmount = searchParams.get('pets')

  return (
    <BookingDetailContextProvider
      property={property}
      startDate={startDate}
      endDate={endDate}
      guestsAmount={{
        adults: Number(adultsAmount ?? 1),
        children: Number(childrenAmount ?? 0),
        infants: Number(infantsAmount ?? 0),
        pets: Number(petsAmount ?? 0),
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
