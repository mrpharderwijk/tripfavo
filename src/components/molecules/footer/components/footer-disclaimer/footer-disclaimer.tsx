import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

type FooterDisclaimerProps = PropsWithChildren<{
  title?: string
}>

export function FooterDisclaimer({
  children,
  title,
}: FooterDisclaimerProps): ReactElement {
  return (
    <Box
      border-b={1}
      border-color="secondary"
      display="flex"
      flex-direction="col"
      padding-b={6}
      padding-b-xl={12}
    >
      <Box display="flex" flex-direction="col" max-w="2xl" gap-y={3}>
        {!!title && (
          <Heading tag="h4" like="h5" font-weight="bold">
            {title}
          </Heading>
        )}
        <Body size="base-sm">{children}</Body>
      </Box>
    </Box>
  )
}
