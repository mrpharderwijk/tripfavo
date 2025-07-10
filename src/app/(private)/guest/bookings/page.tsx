import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { GuestBookingsPage } from '@/features/guest/bookings/guest-bookings/guest-bookings.page'
import { GuestSidebar } from '@/features/guest/components/guest-sidebar/guest-sidebar'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function BookingsNextPage(): Promise<ReactElement> {
  const tGuest = await getTranslations('guest')

  return (
    <AppShell
      navbar={<NavBar position="relative" />}
      sidebar={<GuestSidebar heading={tGuest('heading')} />}
    >
      <GuestBookingsPage />
    </AppShell>
  )
}
