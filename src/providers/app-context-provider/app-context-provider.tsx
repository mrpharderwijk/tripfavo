'use client'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { RouterLoaderProvider } from '@/providers/router-loader-provider/router-loader-provider'
import { SafeUser } from '@/types'

type AppContextState = {
  currentUser: SafeUser | null
  enableAppLoading: (message?: string) => void
  disableAppLoading: () => void
}

type AppContextProviderProps = PropsWithChildren<Pick<AppContextState, 'currentUser'>>

const AppContext = createContext<AppContextState | null>(null)

export function AppContextProvider({ children, currentUser }: AppContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string | null>('Creating your listing')

  function enableAppLoading(message?: string) {
    setLoading(true)
    setLoadingMessage(message ?? null)
  }

  function disableAppLoading() {
    setLoading(false)
    setLoadingMessage(null)
  }

  return (
    <AppContext.Provider value={{ currentUser, enableAppLoading, disableAppLoading }}>
      <RouterLoaderProvider isLoading={loading}>{children}</RouterLoaderProvider>
    </AppContext.Provider>
  )
}

export function useAppContext(): AppContextState {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('Must use AppContextProvider to use useAppContext')
  }

  return context
}
