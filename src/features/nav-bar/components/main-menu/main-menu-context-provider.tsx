'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React, { createContext, RefObject, useContext, useRef, useState } from 'react'
import { PropsWithChildren, ReactElement } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { MainMenuFooterDefault } from '@/features/nav-bar/components/main-menu/main-menu-footer-default'
import { useDisableBodyScrolling } from '@/hooks/use-disable-body-scrolling/use-disable-body-scrolling'
import { getRoutePathByRouteName } from '@/utils/get-route'

type MainMenuContextType = {
  body: ReactElement
  footer: ReactElement
  header: ReactElement
  isOpen: boolean
  handleMainMenuClick: () => void
  handleOnClickSidebarItem: (routeName?: string) => void
  handleOnClickLogout: () => void
  handleOnClickLanguage: () => void
  subMenuRef: RefObject<HTMLDivElement | null>
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
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const subMenuRef = useRef<HTMLDivElement | null>(null)

  useDisableBodyScrolling({ disabled: isOpen })
  useOnClickOutside(subMenuRef as RefObject<HTMLDivElement>, handleMainMenuClick)

  function handleOnClickSidebarItem(routeName?: string): void {
    if (!routeName) {
      return
    }

    const pathName = getRoutePathByRouteName(routeName)
    if (!pathName) {
      return
    }

    router.push(pathName)
    setIsOpen(false)
  }

  function handleMainMenuClick(): void {
    setIsOpen(!isOpen)
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
        handleMainMenuClick,
        handleOnClickLanguage,
        handleOnClickLogout,
        handleOnClickSidebarItem,
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
