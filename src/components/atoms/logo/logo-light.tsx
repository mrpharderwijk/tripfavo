'use client'

import Link from 'next/link'

import { SvgTripfavoLight } from './svgr/tripfavo-light'

export function LogoLight() {
  return (
    <Link data-testid="logo" className="flex flex-row flex-nowrap items-center" href="/">
      <SvgTripfavoLight />
      <span className="text-2xl font-black text-slate-100 ml-0.5 leading-6">tripfavo</span>
    </Link>
  )
}
