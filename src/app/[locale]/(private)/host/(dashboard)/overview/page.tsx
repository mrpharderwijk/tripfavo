import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import Loading from '@/app/[locale]/(private)/host/(dashboard)/overview/loading'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { HostOverview } from '@/features/host/overview/overview'
import { getHostListings } from '@/features/host/server/actions/get-host-listings'
import { isActionError } from '@/server/utils/error'

export default async function HostOverviewPage(): Promise<ReactElement> {
  const tMainMenuHost = await getTranslations('mainMenu.host')
  const result = await getHostListings()
  const listings = isActionError(result) ? [] : (result?.data ?? [])

  return (
    <Suspense fallback={<Loading />}>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tMainMenuHost('myListings')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <HostOverview listings={listings} />
      </FlexBox>
    </Suspense>
  )
}
