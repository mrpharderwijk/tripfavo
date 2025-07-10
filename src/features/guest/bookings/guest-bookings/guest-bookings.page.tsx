import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'
import { Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { getSession } from '@/features/auth/server/actions/get-current-user'
import { BookingsContextProvider } from '@/features/bookings/providers/bookings-context-provider'
import { GuestBookingsOverview } from '@/features/guest/bookings/guest-bookings/components/guest-bookings-overview/guest-bookings-overview'
import { getGuestBookings } from '@/features/guest/bookings/server/actions/get-guest-bookings'
import { isActionError } from '@/server/utils/error'

export async function GuestBookingsPage(): Promise<ReactElement> {
  const session = await getSession()

  const [tGuestBookings, guestBookingsResponse] = await Promise.all([
    getTranslations('guest.bookings'),
    getGuestBookings({ userId: session?.user?.id }),
  ])
  const bookings = isActionError(guestBookingsResponse)
    ? null
    : (guestBookingsResponse?.data ?? null)

  return (
    <AppShellBody>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tGuestBookings('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<DotLoader />}>
          <BookingsContextProvider bookings={bookings ?? []}>
            <GuestBookingsOverview />
          </BookingsContextProvider>
        </Suspense>
      </FlexBox>
    </AppShellBody>
  )
}
