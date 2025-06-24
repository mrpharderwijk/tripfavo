'use client'

import { AlignJustify, Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { DropDownMenu } from '@/components/organisms/drop-down-menu/drop-down-menu'
import { UserMenuDivider } from '@/features/nav-bar/components/user-menu/user-menu-divider'
import { UserMenuItem } from '@/features/nav-bar/components/user-menu/user-menu-item'
import { useDropDownContext } from '@/features/nav-bar/providers/drop-down-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function UserMenuInternal(): ReactElement {
  const router = useRouter()
  const { currentUser } = useAppContext()
  const { currentOpenDropDown, closeDropDown, toggleDropDown } =
    useDropDownContext()
  const tMainMenu = useTranslations('mainMenu')
  const pathname = usePathname()

  function handleUserMenuClick(): void {
    toggleDropDown('user-menu')
  }

  function handleOnClickLanguage(): void {
    closeDropDown('user-menu')
  }

  function onClickMenuItemLogout(): void {
    closeDropDown('user-menu')
    signOut()
  }

  function handleOnClick(routeName: string): void {
    const routePath = getRoutePathByRouteName(routeName)
    closeDropDown('user-menu')

    if (pathname.includes(routePath)) {
      return
    }

    router.push(routePath)
  }

  return (
    <FlexBox flex-direction="row" align-items="center" gap={3}>
      <Button
        onClick={() => handleOnClick('host')}
        size="md"
        variant="quaternary-inverse"
        rounded
      >
        {tMainMenu('host')}
      </Button>

      {currentUser && (
        <Button avatar size="md" onClick={() => handleOnClick('account')} />
      )}

      {!currentUser && (
        <Button
          size="md"
          icon={Globe}
          variant="quaternary"
          onClick={handleOnClickLanguage}
        />
      )}

      <DropDownMenu
        trigger={
          <Button
            size="md"
            icon={AlignJustify}
            variant="quaternary"
            onClick={handleUserMenuClick}
          />
        }
        isOpen={currentOpenDropDown === 'user-menu'}
        id="user-menu"
      >
        {currentUser ? (
          <>
            <UserMenuItem onClick={() => {}} label="My trips" />
            <UserMenuItem onClick={() => {}} label="My favorites" />
            <UserMenuItem onClick={() => {}} label="My bookings" />
            <UserMenuItem onClick={() => {}} label="My properties" />
            <UserMenuItem
              onClick={() => {
                handleOnClick('host')
              }}
              label={tMainMenu('host')}
            />
            <hr />
            <UserMenuItem
              onClick={onClickMenuItemLogout}
              label={tMainMenu('logout')}
            />
          </>
        ) : (
          <>
            <UserMenuItem
              onClick={() => {
                handleOnClick('login')
              }}
              label={tMainMenu('login')}
            />
            <UserMenuDivider />
            <UserMenuItem
              onClick={() => {
                handleOnClick('signUp')
              }}
              label={tMainMenu('signUp')}
            />
          </>
        )}
      </DropDownMenu>
    </FlexBox>
  )
}
