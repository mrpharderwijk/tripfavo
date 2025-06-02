'use client'

import { useTranslations } from 'next-intl'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { useHostContext } from '@/features/host/providers/host-context-provider'

export function HostFooter() {
  const tCommon = useTranslations('common')
  const { currentStepNumber, onPreviousStep, onNextStep, isLoading, steps } = useHostContext()

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col bg-white border-t border-border-tertiary">
      {/* Progress bar */}
      {/* <div className="border-t-6 border-border-tertiary"></div> */}

      {/* Back & Next buttons */}
      <FlexBox
        flex-direction="row"
        align-items="center"
        justify-content={currentStepNumber > 0 ? 'between' : 'end'}
        padding-x={6}
        padding-x-md={12}
        padding-y={4}
      >
        {currentStepNumber > 0 && (
          <Button variant="primary" size="md" onClick={onPreviousStep} loading={isLoading}>
            {tCommon('back')}
          </Button>
        )}

        <Button variant="primary-inverse" size="xl" onClick={onNextStep} loading={isLoading}>
          {currentStepNumber > 0 && currentStepNumber < Object.keys(steps).length - 1
            ? tCommon('next')
            : tCommon('confirm')}
        </Button>
      </FlexBox>
    </div>
  )
}
