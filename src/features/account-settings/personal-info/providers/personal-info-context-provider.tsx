'use client'

import { createContext, PropsWithChildren, ReactElement, useContext, useReducer } from 'react'

import {
  initialState,
  PERSONAL_INFO_TYPE,
} from '@/features/account-settings/personal-info/providers/personal-info-reducer'
import { personalInfoReducer } from '@/features/account-settings/personal-info/providers/personal-info-reducer'

type PersonalInfoContextType = {
  currentEditMode: string | null
  enableEditMode: (value: string) => void
  disableEditMode: () => void
}

type PersonalInfoContextProviderProps = PropsWithChildren

const PersonalInfoContext = createContext<PersonalInfoContextType>({
  currentEditMode: null,
  enableEditMode: () => {},
  disableEditMode: () => {},
})

export function PersonalInfoContextProvider({
  children,
}: PersonalInfoContextProviderProps): ReactElement {
  const [state, dispatch] = useReducer(personalInfoReducer, initialState)

  function enableEditMode(value: string) {
    dispatch({ type: PERSONAL_INFO_TYPE.EnableEditMode, payload: value })
  }

  function disableEditMode() {
    dispatch({ type: PERSONAL_INFO_TYPE.DisableEditMode })
  }

  return (
    <PersonalInfoContext.Provider
      value={{
        currentEditMode: state.currentEditMode,
        enableEditMode,
        disableEditMode,
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  )
}

export function usePersonalInfoContext(): PersonalInfoContextType {
  const context = useContext(PersonalInfoContext)

  if (!context) {
    throw new Error('usePersonalInfoContext must be used within a PersonalInfoContextProvider')
  }

  return context
}
