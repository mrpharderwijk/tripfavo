'use client'

import { LogIn } from 'lucide-react'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName } from '@/utils/get-route'

export function MainMenuFooterDefault(): ReactElement {
  const { currentUser } = useAppContext()
  const tCommon = useTranslations('common')
  const { handleOnClickLogout, toggleMainMenu } = useMainMenuContext()
  const { openDialog } = useDialogContext()

  function onClickAuthButton(dialogId: string): void {
    openDialog(dialogId)
    toggleMainMenu()
  }

  return (
    <>
      {currentUser && (
        <FlexBox flex-direction="col" gap={2} fullWidth>
          <ButtonWrapper
            icon={User}
            size="lg"
            variant="sidebar-menu-item"
            renderRoot={({ buttonContent }) => (
              <Link
                className="w-full"
                href={getRoutePathByRouteName('account')}
                onClick={toggleMainMenu}
              >
                {buttonContent}
              </Link>
            )}
            fullWidth
          >
            {tCommon('mainMenu.account')}
          </ButtonWrapper>

          <Button
            icon={LogOut}
            size="lg"
            variant="sidebar-menu-item"
            onClick={handleOnClickLogout}
            fullWidth
          >
            {tCommon('mainMenu.logout')}
          </Button>
        </FlexBox>
      )}

      {!currentUser && (
        <FlexBox flex-direction="col" gap={2} fullWidth>
          <Button
            icon={LogIn}
            size="lg"
            variant="sidebar-menu-item-active"
            onClick={() => onClickAuthButton('login')}
          >
            {tCommon('mainMenu.login')}
          </Button>
          <Button
            icon={User}
            size="lg"
            variant="sidebar-menu-item-active"
            onClick={() => onClickAuthButton('sign-up')}
          >
            {tCommon('mainMenu.signUp')}
          </Button>
        </FlexBox>
      )}
    </>
  )
}
