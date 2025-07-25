import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { FavoritesItem } from '@/features/guest/favorites/components/favorite-item/favorites-item'
import { FavoritesNoResults } from '@/features/guest/favorites/components/favorites-no-results/favorites-no-results'
import { getGuestFavorites } from '@/features/guest/favorites/server/actions/get-guest-favorites'
import { isActionError } from '@/server/utils/error'

export async function GuestFavoritesPage(): Promise<ReactElement> {
  const [tGuestFavorites, guestFavoritesResponse] = await Promise.all([
    getTranslations('guest.favorites'),
    getGuestFavorites(),
  ])
  const favorites = isActionError(guestFavoritesResponse)
    ? []
    : (guestFavoritesResponse?.data ?? [])

  return (
    <AppShellBody>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tGuestFavorites('heading')}
      </Heading>

      <Suspense fallback={<DotLoader />}>
        <FlexBox flex-direction="col" gap={6}>
          {!favorites?.length && <FavoritesNoResults />}
          {!!favorites?.length &&
            favorites.map(({ id, property }) => (
              <FavoritesItem
                key={id}
                id={id}
                image={property?.images[0] ?? null}
                title={property?.title ?? ''}
                subtitle={`${property?.location?.city}, ${property?.location?.country}`}
              />
            ))}
        </FlexBox>
      </Suspense>
    </AppShellBody>
  )
}
