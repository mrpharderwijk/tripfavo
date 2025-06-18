'use client'

import { PropsWithChildren, ReactElement } from 'react'
import { SWRConfig } from 'swr'

import { axiosFetcher } from '@/utils/axios-fetcher'

type SWRProviderProps = PropsWithChildren

export function SWRProvider({ children }: SWRProviderProps): ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        onError: (error) => {
          console.error('SWR Error:', error)
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
