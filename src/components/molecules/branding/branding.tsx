'use client'

import Link from 'next/link'
import { MouseEvent, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { SvgTripfavoDark } from '@/components/atoms/logo/svgr'
import { Body } from '@/components/atoms/typography/body/body'
import { cn } from '@/utils/class-names'

type BrandingProps = {
  disableLink?: boolean
}

export function Branding({ disableLink = false }: BrandingProps): ReactElement {
  const linkClassName = cn(disableLink && 'pointer-events-none cursor-none')

  function handleOnClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (disableLink) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
  }

  return (
    <Box
      display="flex"
      align-items="center"
      justify-content="center"
      height={20}
    >
      <Link href="/" className={linkClassName} onClick={handleOnClick}>
        <Box
          display="flex"
          align-items="center"
          justify-content="center"
          gap={1}
        >
          <SvgTripfavoDark />
          <Body
            tag="span"
            size="title-sm"
            font-weight="extrabold"
            color="purple"
          >
            tripfavo
          </Body>
        </Box>
      </Link>
    </Box>
  )
}
