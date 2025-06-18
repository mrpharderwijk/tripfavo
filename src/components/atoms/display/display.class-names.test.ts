import { displayClassNames } from './display.class-names'

describe('displayClassNames', () => {
  beforeEach(vi.clearAllMocks)

  describe('show variant', () => {
    const cases = [
      { show: true, expected: 'block' },
      { show: false, expected: 'hidden' },
    ] as const

    it.each(cases)(
      'returns correct classes for show: $show',
      ({ show, expected }) => {
        // Arrange & Act
        const result = displayClassNames({ show })

        // Assert
        expect(result).toBe(expected)
      },
    )
  })

  describe('responsive variants', () => {
    const breakpointCases = [
      { variant: 'show-xs', value: true, expected: 'xs:block' },
      { variant: 'show-xs', value: false, expected: 'xs:hidden' },
      { variant: 'show-sm', value: true, expected: 'sm:block' },
      { variant: 'show-sm', value: false, expected: 'sm:hidden' },
      { variant: 'show-md', value: true, expected: 'md:block' },
      { variant: 'show-md', value: false, expected: 'md:hidden' },
      { variant: 'show-lg', value: true, expected: 'lg:block' },
      { variant: 'show-lg', value: false, expected: 'lg:hidden' },
      { variant: 'show-xl', value: true, expected: 'xl:block' },
      { variant: 'show-xl', value: false, expected: 'xl:hidden' },
      { variant: 'show-2xl', value: true, expected: '2xl:block' },
      { variant: 'show-2xl', value: false, expected: '2xl:hidden' },
      { variant: 'show-3xl', value: true, expected: '3xl:block' },
      { variant: 'show-3xl', value: false, expected: '3xl:hidden' },
    ] as const

    it.each(breakpointCases)(
      'returns correct classes for $variant: $value',
      ({ variant, value, expected }) => {
        // Arrange & Act
        const result = displayClassNames({ [variant]: value })

        // Assert
        expect(result).toBe(expected)
      },
    )
  })

  it('returns empty string when no variants provided', () => {
    // Arrange & Act
    const result = displayClassNames()

    // Assert
    expect(result).toBe('')
  })

  it('combines multiple variants correctly', () => {
    // Arrange & Act
    const result = displayClassNames({
      show: true,
      'show-md': false,
      'show-lg': true,
    })

    // Assert
    expect(result).toBe('block md:hidden lg:block')
  })
})
