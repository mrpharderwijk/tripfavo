import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import Loading from './loading'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Favorites } from '@/features/guest/favorites/guest-favorites'
import { getGuestFavorites } from '@/features/guest/server/actions/get-guest-favorites'
import { isActionError } from '@/server/utils/error'

export default async function FavoritesPage(): Promise<ReactElement> {
  const [tGuestFavorites, favoritesResponse] = await Promise.all([
    getTranslations('guest.favorites'),
    getGuestFavorites(),
  ])

  const favorites = isActionError(favoritesResponse)
    ? []
    : (favoritesResponse?.data ?? [])

  return (
    <>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tGuestFavorites('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<Loading />}>
          <Favorites items={favorites} />
        </Suspense>
      </FlexBox>
    </>
  )
}
