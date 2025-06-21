import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { GuestSidebar } from '@/features/guest/components/guest-sidebar/guest-sidebar'
import { GuestReservationsPage } from '@/features/guest/reservations/guest-reservations/guest-reservations.page'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function ReservationsNextPage(): Promise<ReactElement> {
  const tGuest = await getTranslations('guest')

  return (
    <AppShell
      navbar={<NavBar narrow fixed={false} />}
      sidebar={<GuestSidebar heading={tGuest('heading')} />}
    >
      <GuestReservationsPage />
    </AppShell>
  )
}
