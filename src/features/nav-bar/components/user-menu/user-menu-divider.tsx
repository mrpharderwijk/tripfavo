import { ReactElement } from 'react'

export function UserMenuDivider(): ReactElement {
  return (
    <div className="px-8 py-2">
      <hr className="h-[1px] border-t border-border-primary-disabled" />
    </div>
  )
}
