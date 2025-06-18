'use client'

import { PropsWithChildren, ReactElement } from 'react'

export type ModalFooterProps = PropsWithChildren

export function ModalFooter({ children }: ModalFooterProps): ReactElement {
  return (
    <footer
      className={
        'p-6 flex justify-end gap-2 flex-initial border-t border-border-tertiary'
      }
    >
      {children}
    </footer>
  )
}
