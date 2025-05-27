'use client'

import { PropsWithChildren, ReactElement, RefObject, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { ModalCloseButton } from './components/modal-close-button/modal-close-button'
import { ModalFooter } from './components/modal-footer/modal-footer'
import { ModalHeader } from './components/modal-header/modal-header'
import { ModalImage } from './components/modal-image/modal-image'

import { Portal } from '@/components/atoms/portal/portal'
import { useDisableBodyScrolling } from '@/hooks/use-disable-body-scrolling/use-disable-body-scrolling'
import { useEscapeKey } from '@/hooks/use-escape-key/use-escape-key'
import { useFocusTrap } from '@/hooks/use-focus-trap/use-focus-trap'

export type ModalDialogProps = PropsWithChildren<{
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  isVisible?: boolean
  footer?: ReactElement
  header?: ReactElement
  image?: ReactElement
  onClose: () => void
  showHeaderCloseButton?: boolean
}>

export function ModalDialog({
  children,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  isVisible = false,
  footer,
  header,
  image,
  onClose,
  showHeaderCloseButton = true,
}: ModalDialogProps): ReactElement | null {
  const modalDialogRef = useRef<HTMLDivElement>(null)

  function closeDialog(): void {
    if (modalDialogRef.current) {
      onClose()
    }
  }

  function closeDialogOnOutsideClick() {
    if (!closeOnOutsideClick) {
      return
    }
    closeDialog()
  }

  useDisableBodyScrolling({ disabled: isVisible })
  useEscapeKey(closeDialog, closeOnEscape)
  useOnClickOutside(modalDialogRef as RefObject<HTMLElement>, closeDialogOnOutsideClick)

  return (
    <Portal>
      {!!isVisible && (
        <div
          className="
            bg-grey-1000/40
            fixed
            flex
            focus:outline-none
            h-full
            inset-0
            items-end
            justify-center
            sm:items-center
            p-0
            md:p-10
            z-50
            outline-none
          "
        >
          <div
            className={`
              bg-bg-primary
              flex
              flex-col
              h-full
              mx-auto
              p-0
              relative
              md:rounded-3xl
              w-full
              sm:w-5/6
              md:w-4/6
              lg:w-3/6
              xl:w-2/5
            `}
            ref={modalDialogRef}
          >
            {image && <ModalImage>{image}</ModalImage>}

            <div className="flex flex-shrink flex-grow basis-2/3 flex-col overflow-auto">
              {!!header && (
                <ModalHeader>
                  {showHeaderCloseButton && <ModalCloseButton closeDialog={closeDialog} />}
                  <div className="flex-1 text-center">{header}</div>
                </ModalHeader>
              )}

              <div className="p-6 overflow-scroll flex-auto">{children}</div>

              {!!footer && <ModalFooter>{footer}</ModalFooter>}
            </div>
          </div>
        </div>
      )}
    </Portal>
  )
}

export function ModalFocusTrapWithWrapper({ children }: PropsWithChildren): ReactElement {
  const wrapRef = useRef<HTMLDivElement>(null)
  useFocusTrap({
    ref: wrapRef,
    deactivateOnEscape: true,
    activateOnInit: true,
  })

  return (
    <div className="flex flex-shrink flex-grow basis-2/3 flex-col overflow-auto" ref={wrapRef}>
      {children}
    </div>
  )
}
