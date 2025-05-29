'use client'

import Link from 'next/link'

import { SvgTripfavo } from './svgr/tripfavo'

export function Logo() {
  return (
    <Link data-testid="logo" className="flex flex-row flex-nowrap items-center" href="/">
      <SvgTripfavo />
      <span className="text-2xl font-black text-primary-500 ml-0.5 leading-6">tripfavo</span>
    </Link>
  )
}
