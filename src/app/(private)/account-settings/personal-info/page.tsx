import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AppShellBody } from '@/components/molecules/layout/app-shell/app-shell-body'
import { PersonalInfo } from '@/features/account-settings/personal-info/personal-info'
import { PersonalInfoContextProvider } from '@/features/account-settings/personal-info/providers/personal-info-context-provider'

export default async function PersonalInfoPage(): Promise<ReactElement> {
  const tPersonalInfo = await getTranslations('personal-info')

  return (
    <AppShellBody>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tPersonalInfo('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <Suspense fallback={<DotLoader />}>
          <PersonalInfoContextProvider>
            <PersonalInfo />
          </PersonalInfoContextProvider>
        </Suspense>
      </FlexBox>
    </AppShellBody>
  )
}
