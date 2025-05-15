'use client'
import { createContext, PropsWithChildren, useContext } from 'react'

import { SafeUser } from '@/types'

type AppContextState = {
  currentUser: SafeUser | null
}

type AppContextProviderProps = PropsWithChildren<AppContextState>

const AppContext = createContext<AppContextState | null>(null)

export function AppContextProvider({ children, currentUser }: AppContextProviderProps) {
  return <AppContext.Provider value={{ currentUser }}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextState {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('Must use AppContextProvider to use useAppContext')
  }

  return context
}
