import { PriceType } from '@prisma/client'

import { HostListing } from '@/features/host/listings/types/host-listing'

export type SafeHostListingPriceDetail = {
  id: string
  createdAt: string
  updatedAt: string
  price: number
  type: PriceType
}

export type SafeHostListingHost = {
  id: string
  email: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  } | null
  profileImage: {
    url: string
    fileName: string
  } | null
}

export type SafeHostListing = Omit<
  HostListing,
  'createdAt' | 'updatedAt' | 'host'
> & {
  host: SafeHostListingHost | null
  createdAt: string
  updatedAt: string
}
