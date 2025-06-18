import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import Loading from '@/app/[locale]/(private)/host/(dashboard)/reservations/loading'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'

export default async function HostOverviewPage(): Promise<ReactElement> {
  const tMainMenuHost = await getTranslations('mainMenu.host')
  // const reservations = await getReservationsByLoggedInUser()

  return (
    <Suspense fallback={<Loading />}>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tMainMenuHost('myReservations')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        MyReservations
      </FlexBox>
    </Suspense>
  )
}
