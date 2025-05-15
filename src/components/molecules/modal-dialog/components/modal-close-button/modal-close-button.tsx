'use client'

import { ReactElement } from 'react'
import { IoMdClose } from 'react-icons/io'

import { Button } from '@/components/molecules/buttons/button'

export type ModalCloseButtonProps = {
  closeDialog: () => void
}

export function ModalCloseButton({ closeDialog }: ModalCloseButtonProps): ReactElement {
  return (
    <div className="left-6 top-4 absolute flex items-center justify-center">
      <Button variant="gray" size="xs" onClick={closeDialog}>
        <IoMdClose size={20} />
      </Button>
    </div>
  )
}
