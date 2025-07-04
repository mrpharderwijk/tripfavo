'use client'

import useSWR from 'swr'

import { HostProperty } from '@/features/host/properties/types/host-property'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

type UsePropertyReturnType = {
  property: HostProperty | undefined
  isLoading: boolean
  isError: Error | null
}

export function useProperty(
  propertyId: string | null | undefined,
): UsePropertyReturnType {
  const { currentUser } = useAppContext()
  const shouldFetch = propertyId && propertyId.trim() !== ''

  const { data, isLoading, error } = useSWR<HostProperty>(
    shouldFetch
      ? `/api/host/${currentUser?.id}/properties/${propertyId}`
      : null,
  )

  return {
    property: data,
    isLoading,
    isError: error,
  }
}
