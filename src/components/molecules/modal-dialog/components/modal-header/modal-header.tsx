'use client'

import { PropsWithChildren, ReactElement } from 'react'

export type ModalHeaderProps = PropsWithChildren<{
  showCloseButton?: boolean
}>

export function ModalHeader({ children }: ModalHeaderProps): ReactElement {
  return (
    <header
      className={`
        border-b
        border-border-tertiary
        flex
        flex-initial
        items-center
        justify-between
        min-h-12
        md:min-h-16
        px-6
        py-6
      `}
    >
      {children}
    </header>
  )
}
