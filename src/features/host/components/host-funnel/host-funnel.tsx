'use client'

import { notFound } from 'next/navigation'

import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'

export function HostFunnel() {
  const { steps, currentStep } = useHostContext()
  const StepComponent = steps?.[currentStep as HOST_STEP]?.component ?? notFound()

  return StepComponent && <StepComponent />
}
