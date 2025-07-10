import { ReactElement } from 'react'
import { PriceType } from '@prisma/client'

import {
  EmailHostBookingRequest,
  EmailHostBookingRequestProps,
} from '@/features/host/components/email-host-booking-request/email-host-booking-request'
import { PublicProperty } from '@/features/properties/types/public-property'
import { defaultLocale } from '@/i18n/config'

export default async function GuestBookingRequestSendEmailTemplate(
  props: EmailHostBookingRequestProps,
): Promise<ReactElement> {
  const startDate = '2025-06-20T22:00:00.000Z'
  const endDate = '2025-06-26T22:00:00.000Z'
  const guestsAmount = {
    adults: 4,
    children: 3,
    infants: 2,
    pets: 1,
  }
  const property = {
    id: '1',
    title: 'Lorem ipsum dolor sit amet',
    city: 'Amsterdam',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    neighbourhoodDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    structure:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    privacyType:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    status: 'published',
    priceDetails: [
      {
        type: PriceType.HIGH_SEASON,
        price: 100,
      },
      {
        type: PriceType.MID_SEASON,
        price: 100,
      },
      {
        type: PriceType.LOW_SEASON,
        price: 100,
      },
      {
        type: PriceType.CLEANING_FEE,
        price: 100,
      },
      {
        type: PriceType.DEPOSIT,
        price: 100,
      },
    ],
    images: [
      {
        url: 'https://picsum.photos/200/300',
        isMain: true,
        roomType: 'room',
      },
    ],
    location: {
      city: 'Amsterdam',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
    amenities: [],
    floorPlan: null,
    guestsAmount: null,
    host: {
      id: '1',
      name: 'John Doe',
      profileImage: 'https://picsum.photos/200/300',
    },
  }
  const guest = {
    firstName: 'John Doe',
    profileImageUrl: 'https://picsum.photos/200/300',
    createdAt: new Date().toISOString(),
  }
  const locale = defaultLocale

  return (
    <EmailHostBookingRequest
      {...props}
      startDate={startDate}
      endDate={endDate}
      guestsAmount={guestsAmount}
      property={property as unknown as PublicProperty}
      guest={guest}
      locale={locale}
    />
  )
}
