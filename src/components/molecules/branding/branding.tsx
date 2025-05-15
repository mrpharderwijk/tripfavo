import Link from 'next/link'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { LogoIcon } from '@/components/atoms/logo-icon/logo-icon'
import { Body } from '@/components/atoms/typography/body/body'

export function Branding(): ReactElement {
  return (
    <Box
      display="flex"
      align-items="center"
      justify-content="center"
      height={20}
    >
      <Link href="/">
        <Box
          display="flex"
          align-items="center"
          justify-content="center"
          gap={1}
        >
          <LogoIcon />
          <Body
            tag="span"
            size="title-sm"
            font-weight="semibold"
            data-testid="logo"
            color="primary"
          >
            casabnb
          </Body>
        </Box>
      </Link>
    </Box>
  )
}
