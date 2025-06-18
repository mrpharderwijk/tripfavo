import Image from 'next/image'
import { render } from '@testing-library/react'

import { Avatar } from './avatar'

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => children),
}))
const ImageMock = vi.mocked(Image)

describe('Avatar', () => {
  beforeEach(vi.clearAllMocks)

  const cases = [
    { size: 'xs', width: 24, height: 24 },
    { size: 'sm', width: 34, height: 34 },
    { size: 'md', width: 40, height: 40 },
    { size: 'lg', width: 48, height: 48 },
    { size: 'xl', width: 56, height: 56 },
    { size: null, width: null, height: null },
    { size: undefined, width: null, height: null },
  ] as const

  it.each(cases)(
    'renders avatar with size $size',
    ({ size, width, height }) => {
      // Arrange & Act
      render(<Avatar size={size} />)

      // Assert
      if (size === null || size === undefined) {
        expect(ImageMock).not.toHaveBeenCalled()
        return
      }

      expect(ImageMock).toHaveBeenCalledTimes(1)
      expect(ImageMock).toHaveBeenNthCalledWith(
        1,
        {
          className: expect.any(String),
          width,
          height,
          alt: 'Avatar',
          src: '/placeholder.png',
        },
        undefined,
      )
    },
  )
})
