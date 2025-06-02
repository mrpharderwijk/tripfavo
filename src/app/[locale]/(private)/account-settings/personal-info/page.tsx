import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { PersonalInfo } from '@/features/account-settings/personal-info/personal-info'
import { PersonalInfoContextProvider } from '@/features/account-settings/personal-info/providers/personal-info-context-provider'

export default function PersonalInfoPage(): ReactElement {
  const tPersonalInfo = useTranslations('personal-info')

  return (
    <>
      <Heading tag="h2" like="h4" color="primary" font-weight="bold">
        {tPersonalInfo('heading')}
      </Heading>

      <FlexBox flex-direction="col">
        <PersonalInfoContextProvider>
          <PersonalInfo />
        </PersonalInfoContextProvider>
      </FlexBox>
    </>
  )
}
