import { avatarClassNames } from './avatar.class-names'

describe('avatarClassNames', () => {
  beforeEach(vi.clearAllMocks)

  const cases = [
    { size: 'xs', expected: 'rounded-full w-6 h-6' },
    { size: 'sm', expected: 'rounded-full w-8 h-8' },
    { size: 'md', expected: 'rounded-full w-10 h-10' },
    { size: 'lg', expected: 'rounded-full w-12 h-12' },
    { size: 'xl', expected: 'rounded-full w-14 h-14' },
  ] as const

  it.each(cases)(
    'returns correct classes for size $size',
    ({ size, expected }) => {
      // Arrange & Act
      const result = avatarClassNames({ size })

      // Assert
      expect(result).toBe(expected)
    },
  )

  it('returns base class when no variants provided', () => {
    // Arrange & Act
    const result = avatarClassNames()

    // Assert
    expect(result).toBe('rounded-full')
  })
})
