import { Container } from '@/components/atoms/layout/container/container'
import { getPublishedListings } from '@/features/listings/actions/get-listings'
import { ListingsList } from '@/features/listings/components/listings-list/listings-list'

export default async function Home() {
  const listings = await getPublishedListings()

  return (
    <Container>
      <div className="flex flex-row items-center justify-start flex-wrap gap-6">
        <ListingsList listings={listings} />
      </div>
    </Container>
  )
}
