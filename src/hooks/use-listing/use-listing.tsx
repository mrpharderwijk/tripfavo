'use client'

import useSWR from 'swr'

import { HostListing } from '@/features/host/listings/types/host-listing'

type UseListingReturnType = {
  listing: HostListing | undefined
  isLoading: boolean
  isError: Error | null
}

export function useListing(
  listingId: string | null | undefined,
): UseListingReturnType {
  const shouldFetch = listingId && listingId.trim() !== ''

  const { data, isLoading, error } = useSWR<HostListing>(
    shouldFetch ? `/api/host/listings/${listingId}` : null,
  )

  return {
    listing: data,
    isLoading,
    isError: error,
  }
}
