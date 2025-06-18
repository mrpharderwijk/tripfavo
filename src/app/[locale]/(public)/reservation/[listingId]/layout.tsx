import { PropsWithChildren, ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Footer } from '@/components/molecules/footer/footer'
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
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar narrow fixed={false}>
          <BackButton routePath={`/property/${listingId}`} />
          <Heading tag="h1" like="h4-semibold">
            Reservation
          </Heading>
          <div />
        </NavBar>
      </FlexBoxItem>

      <FlexBoxItem tag="main" padding-b={32} flex="auto" min-height="full">
        {children}

        <Footer />
      </FlexBoxItem>
    </FlexBox>
  )
}
