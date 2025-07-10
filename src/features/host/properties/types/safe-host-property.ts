import { PriceType } from '@prisma/client'

import { HostProperty } from '@/features/host/properties/types/host-property'

export type SafeHostPropertyPriceDetail = {
  id: string
  createdAt: string
  updatedAt: string
  price: number
  type: PriceType
}

export type SafeHostPropertyHost = {
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

export type SafeHostProperty = Omit<
  HostProperty,
  'createdAt' | 'updatedAt' | 'host'
> & {
  host: SafeHostPropertyHost | null
  createdAt: string
  updatedAt: string
}
