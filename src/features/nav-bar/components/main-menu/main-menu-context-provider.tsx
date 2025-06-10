'use client'

import { signOut } from 'next-auth/react'
import React, { createContext, RefObject, useContext, useRef, useState } from 'react'
import { PropsWithChildren, ReactElement } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { MainMenuFooterDefault } from '@/features/nav-bar/components/main-menu/main-menu-footer-default'
import { useDisableBodyScrolling } from '@/hooks/use-disable-body-scrolling/use-disable-body-scrolling'

type MainMenuContextType = {
  body: ReactElement
  footer: ReactElement
  header: ReactElement
  isOpen: boolean
  handleOnClickLogout: () => void
  handleOnClickLanguage: () => void
  subMenuRef: RefObject<HTMLDivElement | null>
  openMainMenu: () => void
  closeMainMenu: () => void
  toggleMainMenu: () => void
}

export const MainMenuContext = createContext<MainMenuContextType | null>(null)

export function MainMenuContextProvider({
  body = <div>body</div>,
  children,
  footer = <MainMenuFooterDefault />,
  header = <div>header</div>,
}: PropsWithChildren<{
  body: ReactElement
  footer: ReactElement
  header: ReactElement
}>): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const subMenuRef = useRef<HTMLDivElement | null>(null)

  useDisableBodyScrolling({ disabled: isOpen })
  useOnClickOutside(subMenuRef as RefObject<HTMLDivElement>, closeMainMenu)

  function toggleMainMenu(): void {
    setIsOpen(!isOpen)
  }

  function openMainMenu(): void {
    setIsOpen(true)
  }

  function closeMainMenu(): void {
    setIsOpen(false)
  }

  async function handleOnClickLogout(): Promise<void> {
    await signOut()
    setIsOpen(false)
  }

  function handleOnClickLanguage(): void {
    console.log('handleOnClickLanguage')
  }

  return (
    <MainMenuContext.Provider
      value={{
        body,
        footer,
        header,
        isOpen,
        toggleMainMenu,
        handleOnClickLanguage,
        handleOnClickLogout,
        openMainMenu,
        closeMainMenu,
        subMenuRef,
      }}
    >
      {children}
    </MainMenuContext.Provider>
  )
}

export function useMainMenuContext(): MainMenuContextType {
  const context = useContext(MainMenuContext)

  if (!context) {
    throw new Error('useMainMenuContext must be used within a MainMenuContextProvider')
  }

  return context
}
