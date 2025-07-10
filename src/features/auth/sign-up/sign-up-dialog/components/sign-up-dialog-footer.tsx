'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

export function SignUpDialogFooter(): ReactElement {
  const tSignUpDialogFooter = useTranslations('auth.signUpDialog.footer')
  const { openDialog } = useDialogContext()

  return (
    <FlexBox align-items="center" justify-content="center" gap={2}>
      <Body size="base-md" text-color="primary">
        {tSignUpDialogFooter.rich('text', {
          link: (chunks) => (
            <Button variant="primary-link" onClick={() => openDialog('login')}>
              <Body
                tag="span"
                font-size="base-md"
                text-color="primary"
                text-decoration="underline"
                font-weight="bold"
              >
                {chunks}
              </Body>
            </Button>
          ),
        })}
      </Body>
    </FlexBox>
  )
}
