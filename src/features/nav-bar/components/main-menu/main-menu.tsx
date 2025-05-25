'use client'

import { AlignJustify, Globe, Heart, House, Ticket, XIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactElement, RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { Button } from '@/components/molecules/buttons/button'
import { routes } from '@/constants/routes'
import { getRoutePathByRouteName, isCurrentRoute } from '@/utils/get-route'

type MainMenuProps = {
  sideMenu?: ReactElement
}

export function MainMenu({ sideMenu }: MainMenuProps): ReactElement {
  const pathname = usePathname()
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
            <header className="flex flex-row items-start justify-between pt-2 px-6">
              <Button icon={XIcon} size="sm" variant="quaternary" onClick={handleMainMenuClick} />
            </header>

            <div className="flex flex-col px-6">
              <div className="flex flex-col gap-4">
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
                  {/* {tHost('sidebar.myListings')} */} My Listings
                </Button>

                <Button
                  icon={Heart}
                  size="lg"
                  variant={
                    !isCurrentRoute(pathname, 'myListings')
                      ? 'sidebar-menu-item'
                      : 'sidebar-menu-item-active'
                  }
                  onClick={() => handleOnClickSidebarItem(routes.host?.children?.myListings?.path)}
                >
                  {/* {tHost('sidebar.myListings')} */} My Favorites
                </Button>

                <Button
                  icon={Ticket}
                  size="lg"
                  variant={
                    !isCurrentRoute(pathname, 'myListings')
                      ? 'sidebar-menu-item'
                      : 'sidebar-menu-item-active'
                  }
                  onClick={() => handleOnClickSidebarItem(routes.host?.children?.myListings?.path)}
                >
                  {/* {tHost('sidebar.myListings')} */} My Bookings
                </Button>

                <Button
                  icon={Globe}
                  size="lg"
                  variant={
                    !isCurrentRoute(pathname, 'myListings')
                      ? 'sidebar-menu-item'
                      : 'sidebar-menu-item-active'
                  }
                  onClick={() => handleOnClickSidebarItem(routes.host?.children?.myListings?.path)}
                >
                  {/* {tHost('sidebar.myListings')} */} Language
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
