'use client'

import { PropsWithChildren, ReactElement } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { Box } from '@/components/atoms/layout/box/box'
import { ButtonUi } from '@/components/molecules/buttons/button-ui/button-ui'
import { useSlider } from '@/components/organisms/slider/hooks/useSlider'
import { PropsWithTestId } from '@/types'

type SliderProps = PropsWithChildren<PropsWithTestId>

export function Slider({
  children,
  'data-testid': dataTestId,
}: SliderProps): ReactElement {
  const { scrollContainerRef, handleNext, handlePrevious } = useSlider()

  return (
    <Box
      position="relative"
      bg-color="gray-lightest"
      display="flex"
      flex-direction="col"
      align-items="start"
      justify-content="center"
      width="full"
      overflow-x="hidden"
      data-testid={dataTestId}
    >
      <ButtonUi
        onClick={handleNext}
        icon={BsChevronRight}
        aria-label="Next slide"
      />
      <ButtonUi
        onClick={handlePrevious}
        icon={BsChevronLeft}
        aria-label="Previous slide"
      />
      <Box
        ref={scrollContainerRef}
        display="flex"
        overflow-x="scroll"
        snap="x"
        snap-type="mandatory"
        width="full"
        gap={6}
        padding-x={6}
        padding-x-md={10}
        padding-x-xl={20}
        scroll-behavior="smooth"
      >
        {children}
      </Box>
    </Box>
  )
}
