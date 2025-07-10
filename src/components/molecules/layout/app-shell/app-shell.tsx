import { PropsWithChildren, ReactElement } from 'react'

import css from './app-shell.module.scss'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { cn } from '@/utils/class-names'

type AppShellProps = PropsWithChildren<{
  navbar?: ReactElement
  sidebar?: ReactElement
  bottomBar?: ReactElement
  fixedNavbar?: boolean
  footer?: ReactElement
}>

export function AppShell({
  children,
  navbar,
  sidebar,
  bottomBar,
  footer,
}: AppShellProps): ReactElement {
  return (
    <div
      className={cn(css.appShell, 'min-w-xs', {
        [css['appShell--bottomBar']]: bottomBar,
        [css['appShell--footer']]: footer,
        [css['appShell--fullWidth']]: !sidebar,
        [css['appShell--sidebar']]: sidebar,
      })}
    >
      <header className={css.appShellNavbar}>{navbar}</header>
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

      <main className={css.appShellMain}>
        {children}
        {footer && <footer className={css.appShellMainFooter}>{footer}</footer>}
      </main>

      <div className={css.appShellBottomBar}>{bottomBar}</div>
    </div>
  )
}
