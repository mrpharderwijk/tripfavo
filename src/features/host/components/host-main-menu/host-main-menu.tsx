import { ReactElement } from 'react'

import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'
import { NavBar } from '@/features/nav-bar/nav-bar'

export function HostMainMenu(): ReactElement {
  return <NavBar body={<HostMainMenuBody />} />
}
