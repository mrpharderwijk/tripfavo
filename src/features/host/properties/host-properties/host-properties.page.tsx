import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostPropertiesOverview } from '@/features/host/properties/host-properties/components/host-properties-overview/host-properties-overview'
import { getHostProperties } from '@/features/host/properties/server/actions/get-host-properties'
import { isActionError } from '@/server/utils/error'

export async function HostPropertiesPage(): Promise<ReactElement> {
  const session = await getSession()
  const tHost = await getTranslations('host')
  const result = await getHostProperties({ userId: session?.user?.id })
  const properties = isActionError(result) ? [] : (result?.data ?? [])

  return (
    <AppShellBody>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tHost('mainMenu.myProperties')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <Suspense fallback={<DotLoader />}>
          <HostPropertiesOverview properties={properties} />
        </Suspense>
      </FlexBox>
    </AppShellBody>
  )
}
