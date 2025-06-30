import { PropsWithChildren, ReactElement } from 'react'

import css from './app-shell.module.scss'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { cn } from '@/utils/class-names'

type AppShellProps = PropsWithChildren<{
  navbar?: ReactElement
  sidebar?: ReactElement
  bottomBar?: ReactElement
  fixedNavbar?: boolean
}>

export function AppShell({
  children,
  navbar,
  sidebar,
  bottomBar,
}: AppShellProps): ReactElement {
  return (
    <div
      className={cn(css.appShell, {
        [css['appShell--fullWidth']]: !sidebar,
        [css['appShell--bottomBar']]: bottomBar,
        [css['appShell--sidebar']]: sidebar,
      })}
    >
      <div className={css.appShellNavbar}>{navbar}</div>
      <div
        className={cn(css.appShellSidebar, {
          [css['appShellSidebar--hidden']]: !sidebar,
        })}
      >
        <FlexBox
          flex-direction="col"
          padding-x={5}
          padding-y={5}
          padding-left-lg={10}
          padding-right-lg={10}
          padding-left-xl={20}
          gap={6}
        >
          {sidebar}
        </FlexBox>
      </div>

      <main className={css.appShellMain}>{children}</main>

      <footer className={css.appShellBottomBar}>{bottomBar}</footer>
    </div>
  )
}
