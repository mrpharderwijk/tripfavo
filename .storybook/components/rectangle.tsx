import { PropsWithChildren, ReactElement } from 'react'

import { Box, BoxProps } from '@/components/atoms/layout/box/box'

type RectangleProps = PropsWithChildren<
  Pick<BoxProps, 'position' | 'spread' | 'z-index'>
>

export function Rectangle({
  children,
  position = 'relative',
  spread,
  'z-index': zIndex,
}: RectangleProps): ReactElement {
  return (
    <Box
      data-testid="rectangle"
      position={position}
      spread={spread}
      z-index={zIndex}
    >
      <Box position="absolute" spread z-index={20}>
        <svg
          className="absolute inset-0 h-full w-full bg-white stroke-gray-900/10"
          fill="none"
        >
          <defs>
            <pattern
              id="pattern-2e2e2dfb-58b7-4019-82fc-58ca045f95ff"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern-2e2e2dfb-58b7-4019-82fc-58ca045f95ff)"
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </Box>
      {!!children && (
        <Box position="relative" z-index={30}>
          {children}
        </Box>
      )}
    </Box>
  )
}
