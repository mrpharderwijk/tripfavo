import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

type CardDialogProps = PropsWithChildren<{
  heading: string
  title?: string
  description?: string
}>

export function CardDialog({
  children,
  heading,
  title,
  description,
}: CardDialogProps): ReactElement {
  return (
    <Box
      display="flex"
      flex-direction="col"
      gap={2}
      border={1}
      border-color="secondary"
      border-radius="xl"
    >
      <Box
        tag="header"
        display="flex"
        flex-direction="row"
        align-items="center"
        justify-content="center"
        padding-y={5}
        border-b={1}
        border-color="secondary-disabled"
      >
        <Heading tag="h1" like="h3-base" color="primary" font-weight="bold">
          {heading}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={6}>
        <FlexBox flex-direction="col" gap={2}>
          {!!title && (
            <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
              {title}
            </Heading>
          )}

          {!!description && (
            <Body color="secondary" size="base-lg">
              {description}
            </Body>
          )}
        </FlexBox>

        {children}
      </Box>
    </Box>
  )
}
