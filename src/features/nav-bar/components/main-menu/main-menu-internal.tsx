'use client'

import { AlignJustify } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { MainMenuContainer } from '@/features/nav-bar/components/main-menu/main-menu-container'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useAppContext, UserMode } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function MainMenuInternal(): ReactElement {
  const router = useRouter()
  const { userMode, setUserMode, isMounted, currentUser } = useAppContext()
  const { handleMainMenuClick, isOpen, subMenuRef, handleOnClickSidebarItem } = useMainMenuContext()
  const tMainMenuGuest = useTranslations('mainMenu.guest')
  const tMainMenuHost = useTranslations('mainMenu.host')
  const tMainMenu = useTranslations('mainMenu')
  const hostRoutePath = getRoutePathByRouteName('host')
  const guestRoutePath = getRoutePathByRouteName('guest')
  const accountRoutePath = getRoutePathByRouteName('account')

  useEffect(() => {
    router.prefetch(hostRoutePath)
    router.prefetch(guestRoutePath)
    router.prefetch(accountRoutePath)
  }, [router, hostRoutePath, guestRoutePath, accountRoutePath])

  return (
    <>
      <FlexBox flex-direction="row" align-items="center" gap={2}>
        {isMounted && (
          <>
            {!currentUser && (
              <Button
                size="md"
                variant="quaternary-inverse"
                rounded
                onClick={() => {
                  handleOnClickSidebarItem('host')
                }}
              >
                {tMainMenu('hostJoin')}
              </Button>
            )}
            {currentUser && userMode === UserMode.GUEST && (
              <Button
                size="md"
                variant="quaternary-inverse"
                rounded
                onClick={() => {
                  setUserMode(UserMode.HOST)
                  handleOnClickSidebarItem('host')
                }}
              >
                {tMainMenuGuest('switchToHost')}
              </Button>
            )}
            {currentUser && userMode === UserMode.HOST && (
              <Button
                size="md"
                variant="quaternary-inverse"
                rounded
                onClick={() => {
                  setUserMode(UserMode.GUEST)
                  handleOnClickSidebarItem('guest')
                }}
              >
                {tMainMenuHost('switchToGuest')}
              </Button>
            )}

            {currentUser && (
              <Button
                avatar
                rounded
                onClick={() => {
                  handleOnClickSidebarItem('account')
                }}
              />
            )}
          </>
        )}
        <Button size="md" icon={AlignJustify} variant="quaternary" onClick={handleMainMenuClick} />
      </FlexBox>
      {isOpen && <MainMenuContainer ref={subMenuRef} />}
    </>
  )
}
