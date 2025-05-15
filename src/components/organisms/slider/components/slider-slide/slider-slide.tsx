import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { boxClassnames } from '@/components/atoms/layout/box/box.class-names'
import { PropsWithTestId } from '@/types'

type SliderSlideProps = PropsWithChildren<
  PropsWithTestId<
    Pick<
      VariantProps<typeof boxClassnames>,
      'display' | 'width' | 'max-width' | 'min-width' | 'snap-align'
    > & { id?: string }
  >
>

export function SliderSlide({
  id,
  children,
  'data-testid': dataTestId,
  ...sliderSlideProps
}: SliderSlideProps): ReactElement {
  return (
    <Box
      id={id}
      display="flex"
      flex-shrink={0}
      flex-grow={1}
      justify-content="center"
      align-items="center"
      snap-align="center"
      data-testid={dataTestId}
      {...sliderSlideProps}
    >
      {children}
    </Box>
  )
}
