import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { GuestSidebar } from '@/features/guest/components/guest-sidebar/guest-sidebar'
import { GuestFavoritesPage } from '@/features/guest/favorites/guest-favorites.page'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function FavoritesPage(): Promise<ReactElement> {
  const tGuestFavorites = await getTranslations('guest.favorites')

  return (
    <AppShell
      navbar={<NavBar fixed={false} />}
      sidebar={<GuestSidebar heading={tGuestFavorites('heading')} />}
    >
      <GuestFavoritesPage />
    </AppShell>
  )
}
