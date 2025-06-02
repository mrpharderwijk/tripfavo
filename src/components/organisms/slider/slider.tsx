'use client'

import { PropsWithChildren, ReactElement } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { useSlider } from '@/components/organisms/slider/hooks/useSlider'
import { PropsWithTestId } from '@/types'

type SliderProps = PropsWithChildren<
  PropsWithTestId & { fullWidth?: boolean; showPagination?: boolean; disableNavigation?: boolean }
>

export function Slider({
  children,
  'data-testid': dataTestId,
  fullWidth = false,
  showPagination = false,
  disableNavigation = false,
}: SliderProps): ReactElement {
  const { scrollContainerRef, handleNext, handlePrevious, currentImageNumber, totalImages } =
    useSlider()

  return (
    <Box
      position="relative"
      display="flex"
      flex-direction="col"
      align-items="start"
      justify-content="center"
      width="full"
      overflow-x="hidden"
      data-testid={dataTestId}
      gap={4}
    >
      {!disableNavigation && (
        <FlexBox
          flex-direction="row"
          align-items="center"
          justify-content="end"
          fullWidth
          gap={2}
          padding-x={4}
          padding-x-sm={6}
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            icon={BsChevronLeft}
            aria-label="Previous slide"
          />
          <Button
            variant="outline"
            onClick={handleNext}
            icon={BsChevronRight}
            aria-label="Next slide"
          />
        </FlexBox>
      )}
      <Box
        ref={scrollContainerRef}
        display="flex"
        overflow-x="scroll"
        snap="x"
        snap-type="mandatory"
        width="full"
        gap={fullWidth ? 0 : 6}
        padding-x={fullWidth ? 0 : 6}
        padding-x-md={fullWidth ? 0 : 10}
        padding-x-xl={fullWidth ? 0 : 20}
        scroll-behavior="smooth"
      >
        {children}
      </Box>
      {!!showPagination && (
        <div className="absolute bottom-10 right-4 z-10">
          <Box bg-color="secondary" padding-x={3} padding-y={2} border-radius="full">
            <Body color="primary-core" size="base-sm">
              {currentImageNumber} / {totalImages}
            </Body>
          </Box>
        </div>
      )}
    </Box>
  )
}
