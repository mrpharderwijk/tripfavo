import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export type UseSliderReturnType = {
  isFirstSlide: boolean
  isLastSlide: boolean
  scrollContainerRef: RefObject<HTMLDivElement | null>
  handleNext: () => void
  handlePrevious: () => void
}

export function useSlider(): UseSliderReturnType {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // Debounced scroll handler to update navigation state
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [isLastSlide, setIsLastSlide] = useState(false)

  const updateNavigationState = useCallback(() => {
    const container = scrollContainerRef?.current
    if (!container) {
      return
    }

    const slides = Array.from(container.children)

    // Find current slide index
    const containerRect = container.getBoundingClientRect()
    const currentSlideIndex = slides.findIndex((slide) => {
      const slideRect = slide.getBoundingClientRect()
      const slideCenter = slideRect.left + slideRect.width / 2
      const containerCenter = containerRect.left + containerRect.width / 2
      return Math.abs(slideCenter - containerCenter) < slideRect.width / 2
    })

    setIsFirstSlide(currentSlideIndex === 0)
    setIsLastSlide(currentSlideIndex === slides.length - 1)
  }, [])

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(updateNavigationState, 150)
  }, [updateNavigationState])

  const handleNext = useCallback(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const slides = Array.from(container.children)

    const currentSlideIndex = slides.findIndex((slide) => {
      const slideRect = slide.getBoundingClientRect()
      const slideCenter = slideRect.left + slideRect.width / 2
      const containerCenter = containerRect.left + containerRect.width / 2
      return Math.abs(slideCenter - containerCenter) < slideRect.width / 2
    })

    if (currentSlideIndex < slides.length - 1) {
      const nextSlide = slides[currentSlideIndex + 1]
      const nextSlideRect = nextSlide.getBoundingClientRect()
      const isMovingToLastSlide = currentSlideIndex === slides.length - 2

      let scrollOffset =
        nextSlideRect.left -
        containerRect.left +
        container.scrollLeft -
        (containerRect.width - nextSlideRect.width) / 2

      if (isMovingToLastSlide) {
        const lastSlide = slides[slides.length - 1]
        const lastSlideRect = lastSlide.getBoundingClientRect()
        const containerRightEdge = containerRect.right
        const lastSlideRightEdge = lastSlideRect.right

        if (lastSlideRightEdge > containerRightEdge) {
          scrollOffset = container.scrollWidth - containerRect.width
        }
      }

      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      })
    }
  }, [])

  const handlePrevious = useCallback(() => {
    if (!scrollContainerRef.current || isFirstSlide) return

    const container = scrollContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const slides = Array.from(container.children)

    const currentSlideIndex = slides.findIndex((slide) => {
      const slideRect = slide.getBoundingClientRect()
      const slideCenter = slideRect.left + slideRect.width / 2
      const containerCenter = containerRect.left + containerRect.width / 2
      return Math.abs(slideCenter - containerCenter) < slideRect.width / 2
    })

    if (currentSlideIndex > 0) {
      const prevSlide = slides[currentSlideIndex - 1]
      const prevSlideRect = prevSlide.getBoundingClientRect()
      const isMovingToFirstSlide = currentSlideIndex === 1

      let scrollOffset =
        prevSlideRect.left -
        containerRect.left +
        container.scrollLeft -
        (containerRect.width - prevSlideRect.width) / 2

      if (isMovingToFirstSlide) {
        scrollOffset = 0
      }

      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      })
    }
  }, [isFirstSlide])

  // Set up scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll, { passive: true })
    updateNavigationState() // Initial state

    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll, updateNavigationState])

  return {
    isFirstSlide,
    isLastSlide,
    scrollContainerRef,
    handleNext,
    handlePrevious,
  }
}
