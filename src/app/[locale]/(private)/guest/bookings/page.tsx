import Loading from "./loading";
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { getGuestReservations } from '@/features/guest/actions/get-guest-reservations'
import { Reservations } from '@/features/guest/reservations/reservations'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

export default async function BookingsPage() {
  const reservations = await getGuestReservations()
  const tGuestReservations = await getTranslations('guest.reservations')

  return (
    <>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tGuestReservations('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<Loading />}>
          <Reservations reservations={reservations ?? []} />
        </Suspense>
      </FlexBox>
    </>
  )
}
