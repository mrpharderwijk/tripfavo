'use client'

import { ReactElement } from 'react'

import { HostMainMenuBody } from '@/features/host/components/host-main-menu/host-main-menu-body'
import { MainMenuBodyDefault } from '@/features/nav-bar/components/main-menu/main-menu-body-default'
import { MainMenuContextProvider } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { MainMenuFooterDefault } from '@/features/nav-bar/components/main-menu/main-menu-footer-default'
import { MainMenuHeaderDefault } from '@/features/nav-bar/components/main-menu/main-menu-header-default'
import { MainMenuInternal } from '@/features/nav-bar/components/main-menu/main-menu-internal'
import {
  useAppContext,
  UserMode,
} from '@/providers/app-context-provider/app-context-provider'

type MainMenuProps = {
  body?: ReactElement
  header?: ReactElement
  footer?: ReactElement
}

export function MainMenu({
  body,
  header,
  footer,
}: MainMenuProps): ReactElement {
  const { userMode } = useAppContext()

  return (
    <MainMenuContextProvider
      body={
        body ??
        (userMode === UserMode.HOST ? (
          <HostMainMenuBody />
        ) : (
          <MainMenuBodyDefault />
        ))
      }
      footer={footer ?? <MainMenuFooterDefault />}
      header={header ?? <MainMenuHeaderDefault />}
    >
      <MainMenuInternal />
    </MainMenuContextProvider>
  )
}
