import { getSession } from "@/actions/get-current-user";
import Loading from "./loading";
import { FlexBox } from "@/components/atoms/layout/flex-box/flex-box";
import { Heading } from "@/components/atoms/typography/heading/heading";
import { getGuestFavorites } from "@/features/guest/actions/get-guest-favorites";
import { Favorites } from "@/features/guest/favorites/favorites";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function FavoritesPage() {
  const favorites = await getGuestFavorites()
  const tGuestFavorites = await getTranslations('guest.favorites')

  return (
    <>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tGuestFavorites('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<Loading />}>
          <Favorites items={favorites ?? []} />
        </Suspense>
      </FlexBox>
    </>
  )
}
