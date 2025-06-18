'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { BottomBar } from '@/components/molecules/bottom-bar/bottom-bar'
import { Button } from '@/components/molecules/buttons/button'
import { useHostContext } from '@/features/host/providers/host-context-provider'

export function HostFooter(): ReactElement {
  const tCommon = useTranslations('common')
  const { currentStepNumber, onPreviousStep, onNextStep, isLoading, steps } =
    useHostContext()

  return (
    <BottomBar>
      <FlexBox
        fullWidth
        flex-direction="row"
        align-items="center"
        justify-content={currentStepNumber > 0 ? 'between' : 'end'}
      >
        {currentStepNumber > 0 && (
          <Button
            variant="primary"
            size="md"
            onClick={onPreviousStep}
            loading={isLoading}
          >
            {tCommon('back')}
          </Button>
        )}

        <Button
          variant="primary-inverse"
          size="xl"
          onClick={onNextStep}
          loading={isLoading}
        >
          {currentStepNumber < Object.keys(steps).length - 1
            ? tCommon('next')
            : tCommon('confirm')}
        </Button>
      </FlexBox>
    </BottomBar>
  )
}
