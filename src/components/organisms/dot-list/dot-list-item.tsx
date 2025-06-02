import { PropsWithChildren, ReactElement } from 'react'

import { DotSeparator } from '@/components/atoms/dot-separator/dot-separator'
import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

export function DotListItem({
  children,
  last,
}: PropsWithChildren<{ last?: boolean }>): ReactElement {
  return (
    <Box
      tag="li"
      display="flex"
      flex-direction="row"
      flex-wrap="nowrap"
      align-items="center"
      justify-content="start"
      gap={2}
    >
      <Body size="base-md" size-md="base-lg" color="secondary">
        {children}
      </Body>
      {!last && <DotSeparator />}
    </Box>
  )
}
