'use client'

import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  RefObject,
  useRef,
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { ModalCloseButton } from './components/modal-close-button/modal-close-button'
import { ModalFooter } from './components/modal-footer/modal-footer'
import { ModalHeader } from './components/modal-header/modal-header'
import { ModalImage } from './components/modal-image/modal-image'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Portal } from '@/components/atoms/portal/portal'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useEscapeKey } from '@/hooks/use-escape-key/use-escape-key'
import { useFocusTrap } from '@/hooks/use-focus-trap/use-focus-trap'

export type ModalDialogProps = PropsWithChildren<{
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  isVisible?: boolean
  footer?: ReactElement
  header?: ReactNode
  image?: ReactElement
  onClose?: () => void
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
  const { closeDialog: closeDialogFromContext } = useDialogContext()
  const modalDialogRef = useRef<HTMLDivElement>(null)

  function closeDialog(): void {
    if (modalDialogRef.current) {
      onClose?.()
      closeDialogFromContext()
    }
  }

  function closeDialogOnOutsideClick(): void {
    if (!closeOnOutsideClick) {
      return
    }
    closeDialog()
  }

  useEscapeKey(closeDialog, closeOnEscape)
  useOnClickOutside(
    modalDialogRef as RefObject<HTMLElement>,
    closeDialogOnOutsideClick,
  )

  return (
    <Portal>
      {!!isVisible && (
        <div
          className="
            bg-grey-1000/40
            fixed
            flex
            focus:outline-none
            h-dvh
            inset-0
            items-end
            justify-center
            sm:items-center
            p-0
            md:p-10
            z-100
            outline-none
          "
        >
          <div
            className={`
              bg-bg-primary
              flex
              flex-col
              max-h-4/6
              mx-auto
              p-0
              absolute
              bottom-0
              rounded-tl-3xl
              rounded-tr-3xl
              w-full
              md:relative
              md:max-h-5/6
              md:w-4/6
              md:rounded-3xl
              lg:w-3/6
              xl:w-2/5
            `}
            ref={modalDialogRef}
          >
            {image && <ModalImage>{image}</ModalImage>}

            <div className="flex flex-shrink flex-grow basis-2/3 flex-col overflow-auto">
              {!!header && (
                <ModalHeader>
                  {showHeaderCloseButton && (
                    <ModalCloseButton closeDialog={closeDialog} />
                  )}
                  <div className="flex-1 text-center">{header}</div>
                </ModalHeader>
              )}

              <FlexBox
                flex-direction="col"
                overflow-y="scroll"
                padding={6}
                gap={6}
              >
                {children}
              </FlexBox>

              {!!footer && <ModalFooter>{footer}</ModalFooter>}
            </div>
          </div>
        </div>
      )}
    </Portal>
  )
}

export function ModalFocusTrapWithWrapper({
  children,
}: PropsWithChildren): ReactElement {
  const wrapRef = useRef<HTMLDivElement>(null)
  useFocusTrap({
    ref: wrapRef,
    deactivateOnEscape: true,
    activateOnInit: true,
  })

  return (
    <div
      className="flex flex-shrink flex-grow basis-2/3 flex-col gap-6 overflow-auto"
      ref={wrapRef}
    >
      {children}
    </div>
  )
}
