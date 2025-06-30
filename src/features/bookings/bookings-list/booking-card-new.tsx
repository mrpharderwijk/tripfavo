import { MapPin } from 'lucide-react'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { PropertyImage } from '@/components/molecules/property-image/property-image'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { BookingCardStatusEnum } from '@/features/bookings/bookings-list/booking-card-status'

interface BookingCardProps {
  id: string
  listingImage: string
  listingTitle: string
  location: string
  guestName: string
  checkinDate: string
  checkoutDate: string
  totalPrice: string
  status: BookingCardStatusEnum
  nights: number
}

export function BookingCard({
  id,
  listingImage,
  listingTitle,
  location,
  guestName,
  checkinDate,
  checkoutDate,
  totalPrice,
  status,
  nights,
}: BookingCardProps): ReactElement {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 p-0">
      <CardContent className="p-0">
        <FlexBox flex-direction="col" flex-direction-md="row">
          <FlexBoxItem
            flex-shrink={0}
            position="relative"
            fullWidth
            width-md={40}
            height={32}
            height-md="auto"
          >
            <PropertyImage src={listingImage} alt={listingTitle} />
          </FlexBoxItem>

          <FlexBoxItem flex={1} padding={4} padding-md={6} fullWidth>
            <FlexBox
              flex-direction="col"
              flex-direction-md="row"
              align-items-md="start"
              justify-content-md="between"
              gap={4}
              fullWidth
            >
              <FlexBoxItem flex={1} min-width={0}>
                <FlexBox
                  flex-direction="col"
                  align-items="start"
                  justify-content="between"
                  gap={2}
                >
                  <FlexBoxItem flex={1} flex-direction="col" gap={2}>
                    <Heading
                      tag="h3"
                      like="h6"
                      font-weight="semibold"
                      text-overflow="truncate"
                    >
                      {listingTitle}
                    </Heading>
                    <FlexBox align-items="center">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-gray-600 text-text-secondary" />
                      <Body
                        size="base-md"
                        color="secondary"
                        text-overflow="truncate"
                      >
                        {location}
                      </Body>
                    </FlexBox>
                  </FlexBoxItem>

                  {/* Status Badge */}
                  {/* <Badge status={booking.status} /> */}
                </FlexBox>

                {/* GuestInfo */}
                {/* <GuestInfo guestName={booking.guestName} /> */}

                {/* Status Badge */}
                {/* 
                <DateRange
                  checkinDate={booking.checkinDate}
                  checkoutDate={booking.checkoutDate}
                  nights={booking.nights}
                />*/}
              </FlexBoxItem>

              <div className="flex-shrink-0 text-right">
                <div className="text-xl font-semibold text-gray-900">$ 300</div>
                <div className="text-sm text-gray-600">total</div>
              </div>
            </FlexBox>
          </FlexBoxItem>
        </FlexBox>
      </CardContent>
    </Card>
  )
}
