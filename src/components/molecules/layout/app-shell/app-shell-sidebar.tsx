import { PropsWithChildren, ReactElement } from 'react'

import { Heading } from '@/components/atoms/typography/heading/heading'

type SidebarProps = PropsWithChildren<{
  heading?: string
}>

export function AppShellSidebar({
  children,
  heading,
}: SidebarProps): ReactElement {
  return (
    <>
      {heading && (
        <Heading tag="h2" like="h4" color="primary" font-weight="bold">
          {heading}
        </Heading>
      )}

      {children}
    </>
  )
}
