'use client'

import { AlignJustify, Globe, Heart, House, LogIn, LogOut, Ticket, User, XIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ReactElement, RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { Button } from '@/components/molecules/buttons/button'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

type MainMenuProps = {
  sideMenu?: ReactElement
}

export function MainMenu({ sideMenu }: MainMenuProps): ReactElement {
  const pathname = usePathname()
  const tMainMenu = useTranslations('mainMenu')
  const { currentUser } = useAppContext()
  const router = useRouter()
  const subMenuRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleMainMenuClick(): void {
    setIsOpen(!isOpen)
  }

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

  function handleOnClickLanguage(): void {
    console.log('handleOnClickLanguage')
  }

  function handleOnClickLogout() {
    signOut()
    setIsOpen(false)
  }

  useOnClickOutside(subMenuRef as RefObject<HTMLDivElement>, handleMainMenuClick)

  return (
    <>
      <Button size="md" icon={AlignJustify} variant="quaternary" onClick={handleMainMenuClick} />
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen bg-grey-1000/40 z-50 p-4 flex flex-row items-end justify-end">
          <div
            ref={subMenuRef}
            className="relative flex flex-col w-full md:w-96 h-full bg-bg-primary rounded-2xl pb-4 gap-4"
          >
            <header className="flex flex-row items-start justify-between pt-2 px-6 flex-initial">
              <Button icon={XIcon} size="sm" variant="quaternary" onClick={handleMainMenuClick} />
            </header>

            <div className="flex flex-col px-6 flex-auto">
              <div className="flex flex-col gap-4">
                {currentUser && (
                  <Button
                    icon={House}
                    size="lg"
                    variant={
                      !isCurrentRoute(pathname, 'myListings')
                        ? 'sidebar-menu-item'
                        : 'sidebar-menu-item-active'
                    }
                    onClick={() => handleOnClickSidebarItem('myListings')}
                  >
                    {tMainMenu('myListings')}
                  </Button>
                )}

                {currentUser && (
                  <Button
                    icon={Heart}
                    size="lg"
                    variant={
                      !isCurrentRoute(pathname, 'myFavorites')
                        ? 'sidebar-menu-item'
                        : 'sidebar-menu-item-active'
                    }
                    onClick={() => handleOnClickSidebarItem('myFavorites')}
                  >
                    {tMainMenu('myFavorites')}
                  </Button>
                )}

                {currentUser && (
                  <Button
                    icon={Ticket}
                    size="lg"
                    variant={
                      !isCurrentRoute(pathname, 'myBookings')
                        ? 'sidebar-menu-item'
                        : 'sidebar-menu-item-active'
                    }
                    onClick={() => handleOnClickSidebarItem('myBookings')}
                  >
                    {tMainMenu('myBookings')}
                  </Button>
                )}

                <Button
                  icon={Globe}
                  size="lg"
                  variant={
                    !isCurrentRoute(pathname, 'language')
                      ? 'sidebar-menu-item'
                      : 'sidebar-menu-item-active'
                  }
                  onClick={handleOnClickLanguage}
                >
                  {tMainMenu('language')}
                </Button>
              </div>
            </div>

            <footer className="flex flex-row gap-4 px-6 flex-initial">
              {currentUser && (
                <>
                  <Button
                    icon={User}
                    size="lg"
                    variant="sidebar-menu-item-active"
                    onClick={() => handleOnClickSidebarItem('account')}
                  >
                    {tMainMenu('account')}
                  </Button>

                  <Button
                    icon={LogOut}
                    size="lg"
                    variant="sidebar-menu-item-active"
                    onClick={handleOnClickLogout}
                  >
                    {tMainMenu('logout')}
                  </Button>
                </>
              )}

              {!currentUser && (
                <>
                  <Button
                    icon={LogIn}
                    size="lg"
                    variant="sidebar-menu-item-active"
                    onClick={() => handleOnClickSidebarItem('login')}
                  >
                    {tMainMenu('login')}
                  </Button>
                  <Button
                    icon={User}
                    size="lg"
                    variant="sidebar-menu-item-active"
                    onClick={() => handleOnClickSidebarItem('signUp')}
                  >
                    {tMainMenu('signUp')}
                  </Button>
                </>
              )}
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
