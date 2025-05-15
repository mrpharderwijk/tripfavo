'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ReactElement, RefObject, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useOnClickOutside } from 'usehooks-ts'

import { Avatar } from '@/components/atoms/avatar/avatar'
import { routes } from '@/constants/routes'
import { RegisterModal } from '@/features/nav-bar/components/register-modal/register-modal'
import { RentModal } from '@/features/nav-bar/components/rent-modal/rent-modal'
import { UserMenuItem } from '@/features/nav-bar/components/user-menu/user-menu-item'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export function UserMenuInternal(): ReactElement {
  const router = useRouter()
  const { currentUser } = useAppContext()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { isUserMenuOpen, setIsUserMenuOpen, openDialog } = useDialogContext()
  const tUserMenu = useTranslations('userMenu')

  useOnClickOutside(wrapperRef as RefObject<HTMLElement>, () => {
    setIsUserMenuOpen(false)
  })

  function handleUserMenuClick() {
    setIsUserMenuOpen(true)
  }

  function onClickMenuItem(dialogId: string) {
    setIsUserMenuOpen(false)
    openDialog(dialogId)
  }

  function onClickMenuItemLogout() {
    setIsUserMenuOpen(false)
    signOut()
  }

  function onClickRent() {
    setIsUserMenuOpen(false)
    if (!currentUser) {
      router.push('/login')
      return
    }

    openDialog('rent')
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onClickRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {tUserMenu('host')}
        </div>
        <div
          onClick={handleUserMenuClick}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isUserMenuOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <UserMenuItem onClick={() => {}} label="My trips" />
                <UserMenuItem onClick={() => {}} label="My favorites" />
                <UserMenuItem onClick={() => {}} label="My reservations" />
                <UserMenuItem onClick={() => {}} label="My properties" />
                <UserMenuItem
                  onClick={() => router.push(routes.host.path)}
                  label={tUserMenu('host')}
                />
                <hr />
                <UserMenuItem onClick={onClickMenuItemLogout} label={tUserMenu('logout')} />
              </>
            ) : (
              <>
                <UserMenuItem
                  onClick={() => router.push(routes.login.path)}
                  label={tUserMenu('login')}
                />
                <UserMenuItem
                  onClick={() => router.push(routes.signUp.path)}
                  label={tUserMenu('signUp')}
                />
              </>
            )}
          </div>
        </div>
      )}

      <RegisterModal />
      <RentModal />
    </div>
  )
}
