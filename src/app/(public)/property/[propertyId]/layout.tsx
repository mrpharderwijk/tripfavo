'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren, ReactElement } from 'react'

import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
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
  const accountRoutePath = getRoutePathByRouteName('account')

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
            <ButtonWrapper
              avatar
              rounded
              renderRoot={({ buttonContent }) => (
                <Link href={accountRoutePath}>{buttonContent}</Link>
              )}
            >
              {currentUser?.profileImage?.url && (
                <Image
                  className="rounded-full object-cover aspect-square"
                  src={currentUser?.profileImage?.url ?? ''}
                  alt="Profile"
                  width={40}
                  height={32}
                />
              )}
            </ButtonWrapper>
          )}
        </NavBar>
      }
    >
      {children}
      <Footer />
    </AppShell>
  )
}
