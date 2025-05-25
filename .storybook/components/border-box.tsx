import { PropsWithChildren, ReactElement } from 'react'

import { Box, BoxProps } from '@/components/atoms/layout/box/box'

type BorderBoxProps = PropsWithChildren<
  Pick<
    BoxProps,
    | 'position'
    | 'width'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'z-index'
    | 'border'
    | 'bg-color'
    | 'border-style'
    | 'border-color'
    | 'opacity'
    | 'overflow'
    | 'gap'
    | 'spread'
  >
>

export function BorderBox({ children, ...props }: BorderBoxProps): ReactElement {
  const {
    position = 'absolute',
    width = 'full',
    top = 0,
    left = 0,
    right = 0,
    bottom = 0,
    'z-index': zIndex = 20,
    border = 'px',
    'border-style': borderStyle = 'dashed',
    'border-color': borderColor = 'primary',
    opacity = 75,
    overflow = 'hidden',
    'bg-color': bgColor = 'transparent',
  } = props
  return (
    <Box
      data-testid="border-box"
      position={position}
      width={width}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      z-index={zIndex}
      border={border}
      border-style={borderStyle}
      border-color={borderColor}
      bg-color={bgColor}
      opacity={opacity}
      overflow={overflow}
    >
      {children}
    </Box>
  )
}
