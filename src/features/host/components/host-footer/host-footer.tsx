'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/molecules/buttons/button'
import { useHostContext } from '@/features/host/providers/host-context-provider'
import { cn } from '@/utils/class-names'

export function HostFooter() {
  const tCommon = useTranslations('common')
  const { currentStepNumber, onPreviousStep, onNextStep, isLoading } = useHostContext()

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col bg-white">
      {/* Progress bar */}
      <div className="border-t-6 border-border-tertiary"></div>

      {/* Back & Next buttons */}
      <div
        className={cn('flex flex-row justify-end py-4 px-6 md:px-12', {
          'justify-between': currentStepNumber > 0,
        })}
      >
        {currentStepNumber > 0 && (
          <Button variant="primary" size="md" onClick={onPreviousStep} loading={isLoading}>
            {tCommon('back')}
          </Button>
        )}

        <Button variant="primary-inverse" size="xl" onClick={onNextStep} loading={isLoading}>
          {tCommon('next')}
        </Button>
      </div>
    </div>
  )
}
