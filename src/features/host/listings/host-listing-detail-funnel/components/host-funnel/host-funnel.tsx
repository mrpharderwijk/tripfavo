'use client'

import { notFound } from 'next/navigation'
import { ReactElement } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Container } from '@/components/atoms/layout/container/container'
import {
  HOST_STEP,
  useHostContext,
} from '@/features/host/providers/host-context-provider'
import { useListing } from '@/hooks/use-listing/use-listing'

export function HostFunnel(): ReactElement {
  const { steps, currentStep, listingId } = useHostContext()
  const { listing, isLoading, isError } = useListing(listingId)

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
    console.error('Error loading listing:', isError)
    return notFound()
  }

  // Show not found if no listing and not loading
  if (!listing) {
    return notFound()
  }

  const StepComponent =
    steps?.[currentStep as HOST_STEP]?.component ?? notFound()

  return (
    StepComponent && (
      <Container narrow="md" padding={false}>
        <StepComponent listing={listing} />
      </Container>
    )
  )
}
