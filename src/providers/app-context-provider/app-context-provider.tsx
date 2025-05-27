'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSessionStorage } from 'usehooks-ts'

import { RouterLoaderProvider } from '@/providers/router-loader-provider/router-loader-provider'
import { SafeUser } from '@/types'

export enum UserMode {
  HOST = 'host',
  GUEST = 'guest',
}

type AppContextState = {
  currentUser: SafeUser | null
  enableAppLoading: (message?: string) => void
  disableAppLoading: () => void
  userMode: UserMode
  setUserMode: Dispatch<SetStateAction<UserMode>>
  isMounted: boolean
}

type AppContextProviderProps = PropsWithChildren<Pick<AppContextState, 'currentUser'>>

const AppContext = createContext<AppContextState | null>(null)

export function AppContextProvider({ children, currentUser }: AppContextProviderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [userMode, setUserMode] = useSessionStorage<UserMode>('userMode', UserMode.GUEST)

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string | null>('Creating your listing')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  function enableAppLoading(message?: string) {
    setLoading(true)
    setLoadingMessage(message ?? null)
  }

  function disableAppLoading() {
    setLoading(false)
    setLoadingMessage(null)
  }

  return (
    <AppContext.Provider
      value={{ currentUser, enableAppLoading, disableAppLoading, userMode, setUserMode, isMounted }}
    >
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
