import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AdminUsersPage } from '@/features/admin/users/admin-users/admin-users.page'
import { GuestSidebar } from '@/features/guest/components/guest-sidebar/guest-sidebar'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function AdminUsersNextPage(): Promise<ReactElement> {
  const tAdmin = await getTranslations('admin')

  return (
    <AppShell
      navbar={<NavBar fixed={false} />}
      sidebar={<GuestSidebar heading={tAdmin('heading')} />}
    >
      <AdminUsersPage />
    </AppShell>
  )
}
