import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FavoritesItem } from '@/features/guest/favorites/components/favorite-item/favorites-item'
import { FavoritesNoResults } from '@/features/guest/favorites/components/favorites-no-results/favorites-no-results'
import { GuestFavorite } from '@/features/guest/types/guest-favorite'

type FavoritesProps = {
  items: GuestFavorite[]
}

export function Favorites({ items }: FavoritesProps): ReactElement {
  return (
    <FlexBox flex-direction="col" gap={3}>
      {!items?.length && <FavoritesNoResults />}
      {!!items?.length &&
        items.map(({ id, listing }) => (
          <FavoritesItem
            key={id}
            id={id}
            image={listing?.images[0] ?? null}
            title={listing?.title ?? ''}
            subtitle={`${listing?.location?.city}, ${listing?.location?.country}`}
          />
        ))}
    </FlexBox>
  )
}
