import { getTranslations } from 'next-intl/server'
import { ReactElement, Suspense } from 'react'

import Loading from '@/app/[locale]/(private)/account-settings/personal-info/loading'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { PersonalInfo } from '@/features/account-settings/personal-info/personal-info'
import { PersonalInfoContextProvider } from '@/features/account-settings/personal-info/providers/personal-info-context-provider'
import { WithSearchParams } from '@/types/with-search-params'

type PersonalInfoPageProps = WithSearchParams

export default async function PersonalInfoPage({
  searchParams,
}: PersonalInfoPageProps): Promise<ReactElement> {
  const tPersonalInfo = await getTranslations('personal-info')

  return (
    <Suspense fallback={<Loading />}>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tPersonalInfo('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <PersonalInfoContextProvider>
          <PersonalInfo />
        </PersonalInfoContextProvider>
      </FlexBox>
    </Suspense>
  )
}
