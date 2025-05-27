import useSWR from 'swr'

import { axiosFetcher } from '@/utils/axios-fetcher'

export function useListing(listingId: string) {
  const { data, isLoading, error } = useSWR(`/api/host/listings/${listingId}`, axiosFetcher)

  return {
    listing: data,
    isLoading,
    isError: error,
  }
}
