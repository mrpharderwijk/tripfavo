import { render, screen } from '@testing-library/react'

import { Display } from './display'
import { displayClassNames } from './display.class-names'

vi.mock('./display.class-names', () => ({
  displayClassNames: vi.fn(() => 'mock-class-name'),
}))
const displayClassNamesMock = vi.mocked(displayClassNames)

describe('Display', () => {
  beforeEach(vi.clearAllMocks)

  it('renders children with correct class name', () => {
    // Arrange
    const testId = 'test-display'
    const childText = 'Test content'

    // Act
    render(<Display data-testid={testId}>{childText}</Display>)

    // Assert
    expect(displayClassNamesMock).toHaveBeenCalledTimes(1)
    expect(displayClassNamesMock).toHaveBeenNthCalledWith(1, {
      show: false,
      'show-xs': false,
      'show-sm': false,
      'show-md': false,
      'show-lg': false,
      'show-xl': false,
      'show-2xl': false,
      'show-3xl': false,
    })

    const displayElement = screen.getByTestId(testId)
    expect(displayElement).toHaveClass('mock-class-name')
    expect(displayElement).toHaveTextContent(childText)
  })

  it('passes all props to displayClassNames', () => {
    // Arrange & Act
    render(
      <Display show show-xs show-sm show-md show-lg show-xl show-2xl show-3xl>
        Content
      </Display>,
    )

    // Assert
    expect(displayClassNamesMock).toHaveBeenCalledTimes(1)
    expect(displayClassNamesMock).toHaveBeenNthCalledWith(
      1,
      {
        show: true,
        'show-xs': true,
        'show-sm': true,
        'show-md': true,
        'show-lg': true,
        'show-xl': true,
        'show-2xl': true,
        'show-3xl': true,
      },
      undefined,
    )
  })

  const cases = [
    { prop: 'show', defaultValue: false },
    { prop: 'show-xs', defaultValue: false },
    { prop: 'show-sm', defaultValue: false },
    { prop: 'show-md', defaultValue: false },
    { prop: 'show-lg', defaultValue: false },
    { prop: 'show-xl', defaultValue: false },
    { prop: 'show-2xl', defaultValue: false },
    { prop: 'show-3xl', defaultValue: false },
  ] as const

  it.each(cases)(
    'uses default value $defaultValue for $prop when not provided',
    ({ prop, defaultValue }) => {
      // Arrange & Act
      render(<Display>Content</Display>)

      // Assert
      expect(displayClassNamesMock).toHaveBeenCalledTimes(1)

      // Type assertion to ensure calledProps is not undefined
      const calledProps = displayClassNamesMock.mock.calls[0][0] as Record<
        string,
        boolean
      >
      expect(calledProps[prop]).toBe(defaultValue)
    },
  )
})
