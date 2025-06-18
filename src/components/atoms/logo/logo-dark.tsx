'use client'

import Link from 'next/link'
import { ReactElement } from 'react'

import { SvgTripfavoDark } from './svgr/tripfavo-dark'

export function LogoDark(): ReactElement {
  return (
    <Link
      data-testid="logo"
      className="flex flex-row flex-nowrap items-center"
      href="/"
    >
      <SvgTripfavoDark width="32" height="32" />
      <span className="text-2xl font-black text-primary-700 ml-0.5 leading-6">
        tripfavo
      </span>
    </Link>
  )
}
