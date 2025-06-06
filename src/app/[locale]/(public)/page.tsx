import { Metadata } from 'next'
import { Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Footer } from '@/components/molecules/footer/footer'
import { getPublishedListings } from '@/features/listings/actions/get-listings'
import { ListingsList } from '@/features/listings/components/listings-list/listings-list'
import { NavBar } from '@/features/nav-bar/nav-bar'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tripfavo.com'),
  title: {
    default: 'TripFavo | Vacation rentals, apartments & villas in the French Riviera',
    template: '%s - TripFavo',
  },
  description:
    'Plan your next vacation to the French Riviera √ Cheap prices √ Low service fees √ No commission √ Amazing experiences',
  keywords: ['travel', 'experiences', 'cotedazur', 'france', 'riviera', 'vacation', 'rental'],
  authors: [{ name: 'TripFavo' }],
  creator: 'TripFavo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'TripFavo',
    title: 'TripFavo',
    description:
      'Plan your next vacation to the French Riviera √ Cheap prices √ Low service fees √ No commission √ Amazing experiences',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TripFavo, your vacation rental in the French Riviera',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TripFavo',
    description:
      'Plan your next vacation to the French Riviera √ Cheap prices √ Low service fees √ No commission √ Amazing experiences',
    images: ['/og-image.jpg'],
    creator: '@tripfavo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function HomePage() {
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
