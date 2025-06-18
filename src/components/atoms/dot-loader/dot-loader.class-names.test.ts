import {
  dotLoaderClassNames,
  dotLoaderWrapperClassNames,
} from './dot-loader.class-names'

describe('dotLoaderClassNames', () => {
  describe('dotLoaderWrapperClassNames', () => {
    it('returns base classes', () => {
      // Arrange & Act
      const result = dotLoaderWrapperClassNames({})

      // Assert
      expect(result).toContain('flex')
      expect(result).toContain('items-center')
      expect(result).toContain('justify-center')
    })

    it.each([
      { size: 'sm', expectedGap: 'gap-1' },
      { size: 'md', expectedGap: 'gap-2' },
      { size: 'lg', expectedGap: 'gap-3' },
    ])('applies correct gap for size=$size', ({ size, expectedGap }) => {
      // Arrange & Act
      const result = dotLoaderWrapperClassNames({ size: size as any })

      // Assert
      expect(result).toContain(expectedGap)
    })
  })

  describe('dotLoaderClassNames', () => {
    it('returns base classes', () => {
      // Arrange & Act
      const result = dotLoaderClassNames({})

      // Assert
      expect(result).toContain('rounded-full')
      expect(result).toContain('animate-dot-loader')
    })

    it('applies correct color class', () => {
      // Arrange & Act
      const result = dotLoaderClassNames({ color: 'black' })

      // Assert
      expect(result).toContain('bg-black')
    })

    it.each([
      { size: 'sm', expectedSize: 'w-1.5 h-1.5' },
      { size: 'md', expectedSize: 'w-2.5 h-2.5' },
      { size: 'lg', expectedSize: 'w-3.5 h-3.5' },
    ])(
      'applies correct size classes for size=$size',
      ({ size, expectedSize }) => {
        // Arrange & Act
        const result = dotLoaderClassNames({ size: size as any })

        // Assert
        const [width, height] = expectedSize.split(' ')
        expect(result).toContain(width)
        expect(result).toContain(height)
      },
    )
  })
})
