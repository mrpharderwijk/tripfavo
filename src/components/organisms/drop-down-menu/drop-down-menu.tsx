'use client'

import { PropsWithChildren, ReactElement, RefObject, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { useDropDownContext } from '@/features/nav-bar/providers/drop-down-context-provider'
import { cn } from '@/utils/class-names'

type DropDownMenuProps = PropsWithChildren & {
  trigger: ReactElement
  isOpen: boolean
  id: string
  size?: 'sm' | 'md'
}

export function DropDownMenu({
  children,
  isOpen,
  trigger,
  id,
  size = 'md',
}: DropDownMenuProps): ReactElement {
  const { closeDropDown, currentOpenDropDown } = useDropDownContext()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dropDownClassName = cn(
    'absolute rounded-xl shadow-md w-[40vw] bg-white right-0 top-0 text-sm py-2 border border-border-tertiary z-10',
    {
      'w-[40vw] md:w-64': size === 'md',
      'w-[20vw] md:w-32': size === 'sm',
    },
  )

  useOnClickOutside(wrapperRef as RefObject<HTMLElement>, () => {
    if (currentOpenDropDown !== id) {
      return
    }
    console.log('closeDropDown: ', id)
    console.log('currentOpenDropDown: ', currentOpenDropDown)
    closeDropDown(id)
  })

  return (
    <div ref={wrapperRef} className="relative">
      {trigger}
      {isOpen && (
        <div className="relative mt-1">
          <div className={dropDownClassName}>
            <FlexBox flex-direction="col">{children}</FlexBox>
          </div>
        </div>
      )}
    </div>
  )
}
