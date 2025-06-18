import { getTranslations } from 'next-intl/server'
import { PropsWithChildren, ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { GuestSidebar } from '@/features/guest/components/guest-sidebar/guest-sidebar'

export default async function GuestLayout({
  children,
}: Readonly<PropsWithChildren>): Promise<ReactElement> {
  const tGuest = await getTranslations('guest')

  return (
    <AppShell sidebar={<GuestSidebar heading={tGuest('heading')} />}>
      {children}
    </AppShell>
  )
}
