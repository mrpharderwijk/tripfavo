import { getTranslations } from 'next-intl/server'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { getHostListings } from '@/features/host/actions/get-host-listings'
import { HostOverview } from '@/features/host/overview/overview'

export default async function HostOverviewPage() {
  const tMainMenuHost = await getTranslations('mainMenu.host')
  const listings = await getHostListings()

  return (
    <>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tMainMenuHost('myListings')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <HostOverview listings={listings} />
      </FlexBox>
    </>
  )
}
