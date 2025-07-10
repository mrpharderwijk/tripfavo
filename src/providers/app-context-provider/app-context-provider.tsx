'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useTransition,
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
  isRouterLoading: boolean
  startTransition: (callback: () => void) => void
}

const AppContext = createContext<AppContextState | null>(null)

type AppContextProviderProps = PropsWithChildren<
  Pick<AppContextState, 'currentUser'>
>

export function AppContextProvider({
  children,
  currentUser,
}: AppContextProviderProps): ReactElement {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [userMode, setUserMode] = useSessionStorage<UserMode>(
    'userMode',
    pathname.includes('/host/') ? UserMode.HOST : UserMode.GUEST,
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string | null>(
    'Creating your property',
  )
  const [isRouterLoading, startTransition] = useTransition()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (pathname.includes('/host/') && userMode !== UserMode.HOST) {
      setUserMode(UserMode.HOST)
    }

    if (pathname.includes('/guest/') && userMode !== UserMode.GUEST) {
      setUserMode(UserMode.GUEST)
    }
  }, [pathname, userMode, setUserMode])

  function enableAppLoading(message?: string): void {
    setLoading(true)
    setLoadingMessage(message ?? null)
  }

  function disableAppLoading(): void {
    setLoading(false)
    setLoadingMessage(null)
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        enableAppLoading,
        disableAppLoading,
        userMode,
        setUserMode,
        isRouterLoading,
        startTransition,
        isMounted,
      }}
    >
      <RouterLoaderProvider isLoading={loading || isRouterLoading}>
        {children}
      </RouterLoaderProvider>
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
