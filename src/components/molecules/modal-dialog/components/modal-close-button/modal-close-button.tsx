'use client'

import { ReactElement } from 'react'
import { IoMdClose } from 'react-icons/io'

import { Button } from '@/components/molecules/buttons/button'

export type ModalCloseButtonProps = {
  closeDialog: () => void
}

export function ModalCloseButton({
  closeDialog,
}: ModalCloseButtonProps): ReactElement {
  return (
    <div className="right-6 top-5 absolute flex items-center justify-center">
      <Button
        icon={IoMdClose}
        variant="quaternary"
        size="sm"
        onClick={closeDialog}
      />
    </div>
  )
}
