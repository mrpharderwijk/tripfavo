import { Suspense } from 'react'

import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Footer } from '@/components/molecules/footer/footer'
import { getPublishedListings } from '@/features/listings/actions/get-listings'
import { ListingsList } from '@/features/listings/components/listings-list/listings-list'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default async function Home() {
  const listings = await getPublishedListings()

  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar />
      </FlexBoxItem>

      <FlexBoxItem
        tag="main"
        margin-top={20}
        padding-t={12}
        padding-b={32}
        flex="auto"
        min-height="full"
      >
        <Container>
          <div className="flex flex-row items-center justify-start flex-wrap gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              <ListingsList listings={listings} />
            </Suspense>
          </div>
        </Container>
      </FlexBoxItem>

      <Footer />
    </FlexBox>
  )
}
