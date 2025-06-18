import { VariantProps } from 'class-variance-authority'
import { render, screen } from '@testing-library/react'

import { DotLoader } from './dot-loader'
import {
  dotLoaderClassNames,
  dotLoaderWrapperClassNames,
} from './dot-loader.class-names'

import { cn } from '@/utils/class-names'

vi.mock('@/utils/class-names')
const cnMock = vi.mocked(cn)

describe('DotLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cnMock.mockImplementation((...args) => args.join(' '))
  })

  it('renders the loader with correct accessibility attributes', () => {
    // Arrange

    // Act
    render(<DotLoader />)

    // Assert
    const loader = screen.getByRole('status')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveAttribute('aria-label', 'Loading')
    expect(screen.getByText('Loading...')).toHaveClass('sr-only')
    expect(cnMock).toHaveBeenCalledTimes(5)
  })

  it('renders three dots with correct delay classes', () => {
    // Arrange & Act
    render(<DotLoader />)

    // Assert
    const dots = screen.getByRole('status').querySelectorAll('div')
    expect(dots).toHaveLength(3)
    expect(dots[0]).toHaveClass('delay-800')
    expect(dots[1]).toHaveClass('delay-400')
    expect(dots[2]).toHaveClass('delay-0')
  })

  describe('props', () => {
    const cases: {
      color: VariantProps<typeof dotLoaderClassNames>['color']
      size: VariantProps<typeof dotLoaderWrapperClassNames>['size']
      expectedColor: VariantProps<typeof dotLoaderClassNames>['color']
      expectedSize: VariantProps<typeof dotLoaderWrapperClassNames>['size']
    }[] = [
      {
        color: undefined,
        size: undefined,
        expectedColor: 'black',
        expectedSize: 'md',
      },
      {
        color: 'black' as const,
        size: 'sm' as const,
        expectedColor: 'black',
        expectedSize: 'sm',
      },
      {
        color: 'black' as const,
        size: 'lg' as const,
        expectedColor: 'black',
        expectedSize: 'lg',
      },
    ]

    it.each(cases)(
      'applies correct classes for color=$color and size=$size',
      ({ color, size, expectedColor, expectedSize }) => {
        // Arrange & Act
        render(<DotLoader color={color} size={size} />)

        // Assert
        expect(cnMock).toHaveBeenNthCalledWith(
          1,
          dotLoaderWrapperClassNames({
            size: expectedSize,
          }),
        )
        expect(cnMock).toHaveBeenNthCalledWith(
          2,
          dotLoaderClassNames({
            color: expectedColor,
            size: expectedSize,
          }),
        )
        expect(cnMock).toHaveBeenNthCalledWith(
          3,
          'delay-800',
          dotLoaderClassNames({
            color: expectedColor as 'black' | undefined,
            size: expectedSize as 'sm' | 'md' | 'lg' | undefined,
          }),
        )
        expect(cnMock).toHaveBeenNthCalledWith(
          4,
          'delay-400',
          dotLoaderClassNames({
            color: expectedColor as 'black' | undefined,
            size: expectedSize as 'sm' | 'md' | 'lg' | undefined,
          }),
        )
        expect(cnMock).toHaveBeenNthCalledWith(
          5,
          'delay-0',
          dotLoaderClassNames({
            color: expectedColor as 'black' | undefined,
            size: expectedSize as 'sm' | 'md' | 'lg' | undefined,
          }),
        )
      },
    )
  })
})
