import { ReactElement } from 'react'

import { LogoIcon } from '@/components/atoms/logo-icon/logo-icon'

export function Logo(): ReactElement {
  return (
    <div className="flex flex-row items-center gap-1">
      <LogoIcon />
      <div className="hidden md:block text-blue-600 text-title-sm font-bold">casabnb</div>
    </div>
  )
}
