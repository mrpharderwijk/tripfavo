'use client'

import { notFound } from 'next/navigation'

import { Container } from '@/components/atoms/layout/container/container'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'

export function HostFunnel() {
  const { steps, currentStep } = useHostContext()
  const StepComponent = steps?.[currentStep as HOST_STEP]?.component ?? notFound()

  return (
    StepComponent && (
      <Container narrow="md" padding={false}>
        <StepComponent />
      </Container>
    )
  )
}
