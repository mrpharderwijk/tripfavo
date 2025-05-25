import Link from 'next/link'
import { ReactElement } from 'react'

import { Display } from '@/components/atoms/display/display'
import { Box } from '@/components/atoms/layout/box/box'
import { LogoIcon } from '@/components/atoms/logo-icon/logo-icon'
import { Body } from '@/components/atoms/typography/body/body'

export function Branding(): ReactElement {
  return (
    <Box display="flex" align-items="center" justify-content="center" height={20}>
      <Link href="/">
        <Box display="flex" align-items="center" justify-content="center" gap={1}>
          <LogoIcon />
          <Display show-lg show-xl show-2xl show-3xl>
            <Body tag="span" size="title-sm" font-weight="semibold" data-testid="logo" color="blue">
              casabnb
            </Body>
          </Display>
        </Box>
      </Link>
    </Box>
  )
}
