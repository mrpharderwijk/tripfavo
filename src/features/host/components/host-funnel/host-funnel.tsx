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
  const { listing, isLoading } = useListing(listingId ?? '')
  if (!listing) {
    return notFound()
  }

  const StepComponent =
    steps?.[currentStep as HOST_STEP]?.component ?? notFound()

  return (
    StepComponent && (
      <Container narrow="md" padding={false}>
        {!isLoading ? <StepComponent listing={listing} /> : <DotLoader />}
      </Container>
    )
  )
}
