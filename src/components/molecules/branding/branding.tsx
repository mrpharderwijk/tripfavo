'use client'

import Link from 'next/link'
import { MouseEvent, ReactElement } from 'react'

import { Display } from '@/components/atoms/display/display'
import { Box } from '@/components/atoms/layout/box/box'
import { SvgTripfavoDark } from '@/components/atoms/logo/svgr'
import { Body } from '@/components/atoms/typography/body/body'
import { cn } from '@/utils/class-names'

type BrandingProps = {
  disableLink?: boolean
}

export function Branding({ disableLink = false }: BrandingProps): ReactElement {
  function handleOnClick(event: MouseEvent<HTMLAnchorElement>) {
    if (disableLink) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
  }
  return (
    <Box display="flex" align-items="center" justify-content="center" height={20}>
      <Link
        href="/"
        className={cn(disableLink && 'pointer-events-none cursor-none')}
        onClick={handleOnClick}
      >
        <Box display="flex" align-items="center" justify-content="center" gap={1}>
          <SvgTripfavoDark />
          <Display show-lg show-xl show-2xl show-3xl>
            <Body
              tag="span"
              size="title-sm"
              font-weight="extrabold"
              data-testid="logo"
              color="purple"
            >
              tripfavo
            </Body>
          </Display>
        </Box>
      </Link>
    </Box>
  )
}
