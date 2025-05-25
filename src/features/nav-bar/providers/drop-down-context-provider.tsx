'use client'

import { createContext, PropsWithChildren, ReactElement, useContext, useReducer } from 'react'

import {
  DROP_DOWN_TYPE,
  dropDownReducer,
  initialState,
} from '@/features/nav-bar/providers/drop-down-context-reducer'

type DropDownContextState = {
  openDropDown: (dropDownId: string) => void
  closeDropDown: (dropDownId: string) => void
  closeAllDropDowns: () => void
  toggleDropDown: (dropDownId: string) => void
  currentOpenDropDown: string | null
}

const DropDownContext = createContext<DropDownContextState | null>(null)

export function DropDownContextProvider({ children }: PropsWithChildren): ReactElement {
  const [state, dispatch] = useReducer(dropDownReducer, initialState)

  function openDropDown(dropDownId: string): void {
    dispatch({ type: DROP_DOWN_TYPE.OpenDropDown, payload: dropDownId ?? null })
  }

  function closeDropDown(dropDownId: string): void {
    dispatch({ type: DROP_DOWN_TYPE.CloseDropDown, payload: dropDownId ?? null })
  }

  function closeAllDropDowns(): void {
    dispatch({ type: DROP_DOWN_TYPE.CloseAllDropDown })
  }

  function toggleDropDown(dropDownId: string): void {
    if (state.currentOpenDropDown === dropDownId) {
      closeDropDown(dropDownId)
    } else {
      openDropDown(dropDownId)
    }
  }

  return (
    <DropDownContext
      value={{
        openDropDown,
        closeDropDown,
        closeAllDropDowns,
        toggleDropDown,
        currentOpenDropDown: state.currentOpenDropDown,
      }}
    >
      {children}
    </DropDownContext>
  )
}

export function useDropDownContext(): DropDownContextState {
  const context = useContext(DropDownContext)

  if (!context) {
    throw new Error('Must use `useDropDownContext` within a `DropDownContextProvider`')
  }

  return context
}
