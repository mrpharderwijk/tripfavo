import { PropsWithChildren, ReactElement } from 'react'

import css from './app-shell.module.scss'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { cn } from '@/utils/class-names'

type AppShellProps = PropsWithChildren<{
  navbar?: ReactElement
  sidebar?: ReactElement
}>

export function AppShell({
  children,
  navbar,
  sidebar,
}: AppShellProps): ReactElement {
  return (
    <div
      className={cn(css.appShell, {
        [css['appShell--fullWidth']]: !sidebar,
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
          padding-x-md={6}
          padding-y-md={5}
          padding-x-lg={18}
          padding-y-lg={10}
          gap={6}
        >
          {sidebar}
        </FlexBox>
      </div>
      <main className={css.appShellMain}>{children}</main>
    </div>
  )
}
