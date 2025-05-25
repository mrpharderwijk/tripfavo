import { PropsWithChildren, ReactElement } from 'react'

import { Box, BoxProps } from '@/components/atoms/layout/box/box'

type MarginBoxProps = PropsWithChildren<BoxProps>

export function MarginBox({ children, ...props }: MarginBoxProps): ReactElement {
  const {
    position = 'absolute',
    top = 0,
    right = 0,
    bottom = 0,
    left = 0,
    opacity,
    float,
    'bg-color': bgColor = 'tertiary-core',
    'z-index': zIndex,
    width = 'full',
  } = props
  return (
    <Box
      position={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      bg-color={bgColor}
      float={float}
      opacity={opacity}
      width={width}
      z-index={zIndex}
    >
      {children}
    </Box>
  )
}
