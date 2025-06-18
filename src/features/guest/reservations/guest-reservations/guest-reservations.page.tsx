import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { Suspense } from 'react'

import Loading from '@/app/[locale]/(private)/guest/reservations/loading'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { GuestReservations } from '@/features/guest/reservations/guest-reservations/components/reservations-overview/reservations-overview'
import { getGuestReservations } from '@/features/guest/server/actions/get-guest-reservations'
import { isActionError } from '@/server/utils/error'

export async function GuestReservationsPage(): Promise<ReactElement> {
  const [tGuestReservations, guestReservationsResponse] = await Promise.all([
    getTranslations('guest.reservations'),
    getGuestReservations(),
  ])
  const reservations = isActionError(guestReservationsResponse)
    ? null
    : (guestReservationsResponse?.data ?? null)

  return (
    <>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tGuestReservations('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<Loading />}>
          <GuestReservations reservations={reservations ?? []} />
        </Suspense>
      </FlexBox>
    </>
  )
}
