import { PropsWithChildren, ReactElement } from 'react'

type SidebarProps = PropsWithChildren<{
  heading?: string
}>

export function AppShellSidebar({
  children,
  heading,
}: SidebarProps): ReactElement {
  return <>{children}</>
}
