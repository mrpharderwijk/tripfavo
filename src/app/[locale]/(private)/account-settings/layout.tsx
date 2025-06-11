import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import { AccountSidebar } from '@/features/account-settings/components/account-sidebar/account-sidebar'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { getTranslations } from 'next-intl/server'

export default async function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const tAccount = await getTranslations('account')

  return (
    <AppShell sidebar={<AccountSidebar heading={tAccount('heading')} />}>
      {children}
    </AppShell>
  )
}
