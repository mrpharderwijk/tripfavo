import { getTranslations } from 'next-intl/server'
import { PropsWithChildren, ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { Footer } from '@/components/molecules/footer/footer'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'

type BookingDetailLayoutProps = PropsWithChildren<{
  params: Promise<{ listingId: string }>
}>

export default async function BookingDetailLayout({
  children,
  params,
}: BookingDetailLayoutProps): Promise<ReactElement> {
  const { listingId } = await params
  const tBookingDetail = await getTranslations('bookingDetail')

  return (
    <AppShell
      navbar={
        <NavBar narrow fixed={false}>
          <BackButton routePath={`/property/${listingId}`} />
          {/**
           * TODO: Add reservation title
           */}
          <Heading tag="h1" like="h4-semibold">
            {tBookingDetail('heading')}
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
