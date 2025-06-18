import { getTranslations } from 'next-intl/server'
import { PropsWithChildren, ReactElement } from 'react'

import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { AccountSidebar } from '@/features/account-settings/components/account-sidebar/account-sidebar'

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>): Promise<ReactElement> {
  const tAccount = await getTranslations('account')

  return (
    <AppShell sidebar={<AccountSidebar heading={tAccount('heading')} />}>
      {children}
    </AppShell>
  )
}
