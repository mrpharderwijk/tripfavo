import { PropsWithChildren, ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { Footer } from '@/components/molecules/footer/footer'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'

type ReservationDetailLayoutProps = PropsWithChildren<{
  params: Promise<{ listingId: string }>
}>

export default async function ReservationDetailLayout({
  children,
  params,
}: ReservationDetailLayoutProps): Promise<ReactElement> {
  const { listingId } = await params

  return (
    <AppShell
      navbar={
        <NavBar narrow fixed={false}>
          <BackButton routePath={`/property/${listingId}`} />
          {/**
           * TODO: Add reservation title
           */}
          <Heading tag="h1" like="h4-semibold">
            Reservation
          </Heading>
          <div />
        </NavBar>
      }
    >
      {children}

      <Footer />
    </AppShell>
  )
}
