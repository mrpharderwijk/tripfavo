import useSWR from 'swr'

import { HostListing } from '@/features/host/types/host-listing'
import { axiosFetcher } from '@/utils/axios-fetcher'

type UseListingReturnType = {
  listing: HostListing | undefined
  isLoading: boolean
  isError: Error
}

export function useListing(listingId: string): UseListingReturnType {
  const { data, isLoading, error } = useSWR(
    `/api/host/listings/${listingId}`,
    axiosFetcher as (url: string) => Promise<HostListing>,
  )

  return {
    listing: data,
    isLoading,
    isError: error,
  }
}
