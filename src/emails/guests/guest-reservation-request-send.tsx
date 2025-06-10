import {
  EmailGuestReservationRequest,
  EmailGuestReservationRequestProps,
} from '@/features/guest/components/email-guest-reservation-request/email-guest-reservation-request'
import { PublicListing } from '@/features/listings/types/public-listing'
import { PriceType } from '@prisma/client'

export default async function GuestReservationRequestSendEmailTemplate(props: EmailGuestReservationRequestProps) {
  const startDate = '2025-06-20T22:00:00.000Z'
  const endDate = '2025-06-26T22:00:00.000Z'
  const guestsAmount = {
    adults: 4,
    children: 3,
    infants: 2,
    pets: 1,
  }
  const listing = {
    id: '1',
    title: 'Lorem ipsum dolor sit amet',
    city: 'Amsterdam',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    neighbourhoodDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    structure: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    privacyType: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
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
  const locale = 'en-US'

  return <EmailGuestReservationRequest {...props} startDate={startDate} endDate={endDate} guestsAmount={guestsAmount} listing={listing as unknown as PublicListing} locale={locale} />
}
