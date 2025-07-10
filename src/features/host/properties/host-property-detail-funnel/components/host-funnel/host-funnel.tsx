'use client'

import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Container } from '@/components/atoms/layout/container/container'
import {
  HOST_STEP,
  useHostContext,
} from '@/features/host/properties/providers/host-context-provider'
import { useProperty } from '@/hooks/use-property/use-property'

export function HostFunnel(): ReactElement {
  const { steps, currentStep, propertyId } = useHostContext()
  const { property, isLoading, isError } = useProperty(propertyId)

  // Show loading state while fetching
  if (isLoading) {
    return (
      <Container narrow="md" padding={false}>
        <DotLoader />
      </Container>
    )
  }

  // Show error state if there's an error
  if (isError) {
    console.error('Error loading property:', isError)
    return notFound()
  }

  // Show not found if no property and not loading
  if (!property) {
    return notFound()
  }

  const StepComponent =
    steps?.[currentStep as HOST_STEP]?.component ?? notFound()

  return (
    StepComponent && (
      <Container narrow="md" padding={false}>
        <StepComponent property={property} />
      </Container>
    )
  )
}
