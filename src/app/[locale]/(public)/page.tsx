import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Footer } from '@/components/molecules/footer/footer'
import { ListingsList } from '@/features/listings/components/listings-list/listings-list'
import { getPublishedListings } from '@/features/listings/server/actions/get-listings'
import { NavBar } from '@/features/nav-bar/nav-bar'
import { isActionError } from '@/server/utils/error'

export default async function Home(): Promise<ReactElement> {
  const listingsResponse = await getPublishedListings()
  const listings = isActionError(listingsResponse)
    ? []
    : (listingsResponse?.data ?? [])

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
        <Container fullHeight>
          <div className="flex flex-row items-center justify-start flex-wrap gap-6 h-full">
            <Suspense
              fallback={
                <Grid place-items="center" fullWidth fullHeight>
                  <DotLoader size="lg" />
                </Grid>
              }
            >
              <ListingsList listings={listings} />
            </Suspense>
          </div>
        </Container>
      </FlexBoxItem>

      <Footer />
    </FlexBox>
  )
}
