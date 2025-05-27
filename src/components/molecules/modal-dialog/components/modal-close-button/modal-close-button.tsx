'use client'

import { ReactElement } from 'react'
import { IoMdClose } from 'react-icons/io'

import { Button } from '@/components/molecules/buttons/button'

export type ModalCloseButtonProps = {
  closeDialog: () => void
}

export function ModalCloseButton({ closeDialog }: ModalCloseButtonProps): ReactElement {
  return (
    <div className="left-4 top-3 absolute flex items-center justify-center">
      <Button icon={IoMdClose} variant="quaternary" size="xs" onClick={closeDialog}></Button>
    </div>
  )
}
