import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { getPublishedListing } from '@/features/listings/actions/get-listings'
import { ListingDetailPage } from '@/features/listings/listing-detail/listing-detail.page'

export async function generateMetadata({ params }: ListingPageProps) {
  const { listingId } = await params
  const listing = await getPublishedListing(listingId)

  if (!listing) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }

  return {
    title: listing.title,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images:
        listing.images?.map((image) => ({
          url: image.url,
          width: 1200,
          height: 630,
          alt: listing.title,
        })) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: listing.title,
      description: listing.description,
      images: listing.images?.map((image) => image.url) || [],
    },
  }
}

type ListingPageProps = {
  params: Promise<{ listingId: string }>
}

export default async function ListingPage({ params }: ListingPageProps): Promise<ReactElement> {
  const { listingId } = await params
  const listing = await getPublishedListing(listingId)

  if (!listing) {
    notFound()
  }

  return <ListingDetailPage listing={listing} />
}
