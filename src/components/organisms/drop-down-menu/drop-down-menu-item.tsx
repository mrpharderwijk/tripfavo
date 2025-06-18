'use client'

import { MouseEvent, ReactElement } from 'react'

type DropDownMenuItemProps = {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export function DropDownMenuItem({
  label,
  onClick,
}: DropDownMenuItemProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className="px-8 py-2 text-text-primary-core text-base-md text-left font-medium hover:bg-bg-primary-hover transition duration-300"
    >
      {label}
    </button>
  )
}
