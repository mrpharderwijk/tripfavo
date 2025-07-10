'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren, ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { Footer } from '@/components/molecules/footer/footer'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

type PropertyDetailLayoutProps = PropsWithChildren<{
  params: Promise<{ propertyId: string }>
}>

export default function PropertyDetailLayout({
  children,
  params,
}: PropertyDetailLayoutProps): ReactElement {
  const { currentUser } = useAppContext()
  const router = useRouter()

  function onClickAvatarButton(): void {
    const routePath = getRoutePathByRouteName('account-settings')
    router.push(routePath)
  }

  return (
    <AppShell
      navbar={
        <NavBar
          narrow
          position="absolute"
          bg-color="transparent"
          border={false}
        >
          <BackButton routePath="/" />
          <div />
          {currentUser && (
            <Button avatar size="md" onClick={onClickAvatarButton} />
          )}
        </NavBar>
      }
    >
      {children}
      <Footer />
    </AppShell>
  )
}
