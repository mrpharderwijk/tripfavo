import { PropsWithChildren, ReactElement } from 'react'

import { Footer } from '@/components/molecules/footer/footer'
import { AppShell } from '@/components/molecules/layout/app-shell/app-shell'
import { BackButton } from '@/features/nav-bar/components/back-button/back-button'
import { NavBar } from '@/features/nav-bar/nav-bar'

type ListingDetailLayoutProps = PropsWithChildren<{
  params: Promise<{ listingId: string }>
}>

export default async function ListingDetailLayout({
  children,
  params,
}: ListingDetailLayoutProps): Promise<ReactElement> {
  return (
    <AppShell
      navbar={
        <NavBar narrow fixed={false}>
          <BackButton routePath="/" />
        </NavBar>
      }
    >
      {children}
      <Footer />
    </AppShell>
    //   <FlexBox flex-direction="col" fullHeight>
    //     <FlexBoxItem flex="initial">

    //     </FlexBoxItem>

    //     <FlexBoxItem tag="main" padding-b={32} flex="auto" min-height="full">

    //     </FlexBoxItem>
    //   </FlexBox>
  )
}
