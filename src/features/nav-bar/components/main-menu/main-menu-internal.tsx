'use client'

import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { MainMenuContainer } from '@/features/nav-bar/components/main-menu/main-menu-container'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import {
  useAppContext,
  UserMode,
} from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function MainMenuInternal(): ReactElement {
  const { userMode, setUserMode, isMounted, currentUser } = useAppContext()
  const { toggleMainMenu, isOpen, subMenuRef } = useMainMenuContext()
  const tGuestMainMenu = useTranslations('guest.mainMenu')
  const tHostMainMenu = useTranslations('host.mainMenu')
  const tCommonMainMenu = useTranslations('common.mainMenu')

  const hostRoutePath = getRoutePathByRouteName('host')
  const guestRoutePath = getRoutePathByRouteName('guest')
  const accountRoutePath = getRoutePathByRouteName('account')

  return (
    <>
      <FlexBox flex-direction="row" align-items="center" gap={2}>
        {isMounted && (
          <>
            {/* TODO: Add language switcher */}
            {/* <LanguageSwitcher currentLocale={locale as Locale} /> */}
            {!currentUser && (
              <ButtonWrapper
                size="md"
                variant="quaternary-inverse"
                rounded
                renderRoot={({ buttonContent }) => (
                  <Link href={hostRoutePath}>{buttonContent}</Link>
                )}
              >
                {tCommonMainMenu('hostJoin')}
              </ButtonWrapper>
            )}
            {currentUser && userMode === UserMode.GUEST && (
              <ButtonWrapper
                size="md"
                variant="quaternary-inverse"
                rounded
                onClick={() => {
                  setUserMode(UserMode.HOST)
                }}
                renderRoot={({ buttonContent }) => (
                  <Link href={hostRoutePath}>{buttonContent}</Link>
                )}
              >
                {tGuestMainMenu('switchToHost')}
              </ButtonWrapper>
            )}
            {currentUser && userMode === UserMode.HOST && (
              <ButtonWrapper
                size="md"
                variant="quaternary-inverse"
                rounded
                onClick={() => {
                  setUserMode(UserMode.GUEST)
                }}
                renderRoot={({ buttonContent }) => (
                  <Link href={guestRoutePath}>{buttonContent}</Link>
                )}
              >
                {tHostMainMenu('switchToGuest')}
              </ButtonWrapper>
            )}

            {currentUser && (
              <ButtonWrapper
                avatar
                rounded
                renderRoot={({ buttonContent }) => (
                  <Link href={accountRoutePath}>{buttonContent}</Link>
                )}
              >
                {currentUser?.profileImage?.url && (
                  <Image
                    className="rounded-full object-cover aspect-square"
                    src={currentUser?.profileImage?.url ?? ''}
                    alt="Profile"
                    width={40}
                    height={32}
                  />
                )}
              </ButtonWrapper>
            )}
          </>
        )}
        <Button
          size="md"
          rounded
          icon={AlignJustify}
          variant="quaternary"
          onClick={toggleMainMenu}
        />
      </FlexBox>
      {isOpen && <MainMenuContainer ref={subMenuRef} />}
    </>
  )
}
