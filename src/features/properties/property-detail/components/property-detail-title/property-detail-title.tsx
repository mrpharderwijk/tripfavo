'use client'

import { ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'

export function PropertyDetailTitle(): ReactElement | null {
  const {
    property: { title },
  } = usePropertyDetailContext()

  if (!title) {
    return null
  }

  return (
    <Heading tag="h1" like="h2-semibold" text-align="center">
      {title}
    </Heading>
  )
}
