import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { HostListingsOverview } from '@/features/host/listings/host-listings/components/host-listings-overview/host-listings-overview'
import { getHostListings } from '@/features/host/server/actions/get-host-listings'
import { isActionError } from '@/server/utils/error'

export async function HostListingsPage(): Promise<ReactElement> {
  const tHost = await getTranslations('host')
  const result = await getHostListings()
  const listings = isActionError(result) ? [] : (result?.data ?? [])

  return (
    <AppShellBody>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tHost('mainMenu.myListings')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<DotLoader />}>
          <HostListingsOverview listings={listings} />
        </Suspense>
      </FlexBox>
    </AppShellBody>
  )
}
