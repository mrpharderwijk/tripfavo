'use client'

import { useTranslations } from 'next-intl'

import { Body } from '@/components/atoms/typography/body/body'
import { UserName } from '@/components/molecules/user-name/user-name'
import { SettingsLine } from '@/features/account-settings/components/settings-line/settings-line'
import { LegalNameForm } from '@/features/account-settings/personal-info/components/legal-name-form/legal-name-form'
import { usePersonalInfoContext } from '@/features/account-settings/personal-info/providers/personal-info-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export function PersonalInfo() {
  const { currentUser } = useAppContext()
  const { currentEditMode, enableEditMode, disableEditMode } = usePersonalInfoContext()
  const tPersonalInfo = useTranslations('personal-info')
  const tCommonForms = useTranslations('common.forms')

  function handleOnClick(value: string) {
    if (!value || value === currentEditMode) {
      disableEditMode()
      return
    }

    enableEditMode(value)
  }

  return (
    <>
      <SettingsLine
        editMode={currentEditMode === 'legal-name'}
        handleOnClick={() => handleOnClick('legal-name')}
        label={tPersonalInfo('legal-name.label')}
        value={<UserName color="secondary" name={currentUser?.name ?? null} />}
        formIntro={tPersonalInfo('legal-name.formIntro')}
        form={<LegalNameForm />}
      />

      <SettingsLine
        editMode={currentEditMode === 'email'}
        label={tCommonForms('email.label')}
        value={
          <Body tag="span" color="secondary" size="base-md">
            {currentUser?.email}
          </Body>
        }
      />
    </>
  )
}
