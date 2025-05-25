'use client'

import { ReactElement } from 'react'

type UserMenuItemProps = {
  label: string
  onClick: () => void
}

export function UserMenuItem({ label, onClick }: UserMenuItemProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className="px-8 py-2 text-text-primary-core text-base-md text-left font-medium hover:bg-bg-primary-hover transition duration-300"
    >
      {label}
    </button>
  )
}
