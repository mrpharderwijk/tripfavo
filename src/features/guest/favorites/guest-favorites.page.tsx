import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FavoritesItem } from '@/features/guest/favorites/components/favorite-item/favorites-item'
import { FavoritesNoResults } from '@/features/guest/favorites/components/favorites-no-results/favorites-no-results'
import { getGuestFavorites } from '@/features/guest/server/actions/get-guest-favorites'
import { isActionError } from '@/server/utils/error'

export async function GuestFavoritesPage(): Promise<ReactElement> {
  const favoritesResponse = await getGuestFavorites()
  const favorites = isActionError(favoritesResponse)
    ? []
    : (favoritesResponse?.data ?? [])

  return (
    <FlexBox flex-direction="col" gap={6}>
      <Suspense fallback={<DotLoader />}>
        {!favorites?.length && <FavoritesNoResults />}
        {!!favorites?.length &&
          favorites.map(({ id, listing }) => (
            <FavoritesItem
              key={id}
              id={id}
              image={listing?.images[0] ?? null}
              title={listing?.title ?? ''}
              subtitle={`${listing?.location?.city}, ${listing?.location?.country}`}
            />
          ))}
      </Suspense>
    </FlexBox>
  )
}
