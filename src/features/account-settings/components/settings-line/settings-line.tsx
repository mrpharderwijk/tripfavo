import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'

type SettingsLineProps = {
  editMode?: boolean
  handleOnClick?: () => void
  label: string
  value: ReactElement | null
  form?: ReactElement
  formIntro?: string
}

export function SettingsLine({
  editMode = false,
  form,
  formIntro,
  handleOnClick,
  label,
  value,
}: SettingsLineProps) {
  const tCommonForms = useTranslations('common.forms')

  return (
    <FlexBox
      flex-direction="row"
      gap={4}
      border-b={1}
      padding-y={6}
      border-color="deco"
      align-items="start"
      justify-content="start"
    >
      <FlexBoxItem display="flex" flex-direction="col" flex="auto" gap={1}>
        <Body tag="span" color="primary" font-weight="bold">
          {label}
        </Body>

        <FlexBox flex-direction="col" gap={6}>
          <Body tag="span" color="secondary" size="base-md">
            {!!editMode && !!formIntro ? formIntro : value}
          </Body>

          {!!editMode && !!form && form}
        </FlexBox>
      </FlexBoxItem>

      {!!formIntro && !!form && (
        <FlexBoxItem flex="initial">
          <Button variant="primary-link" onClick={handleOnClick}>
            {editMode ? tCommonForms('cancel') : tCommonForms('edit')}
          </Button>
        </FlexBoxItem>
      )}
    </FlexBox>
  )
}
