import { ReactElement } from 'react'

import { SvgTripfavoLight } from '@/components/atoms/logo/svgr'

export function Logo(): ReactElement {
  return (
    <div className="flex flex-row items-center gap-1">
      <SvgTripfavoLight />
      <div className="hidden md:block text-blue-600 text-title-sm font-bold">TripFavo</div>
    </div>
  )
}
