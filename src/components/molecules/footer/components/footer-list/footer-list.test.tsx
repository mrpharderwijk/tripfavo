import { render, screen } from '@testing-library/react'

import { FooterList } from './footer-list'

import { Box } from '@/components/atoms/layout/box/box'
import { Heading } from '@/components/atoms/typography/heading/heading'

vi.mock('@/components/atoms/layout/box/box', () => ({
  Box: vi.fn(({ children }) => <>{children}</>),
}))
const BoxMock = vi.mocked(Box)

vi.mock('@/components/atoms/typography/heading/heading')
const HeadingMock = vi.mocked(Heading)

describe('FooterList', () => {
  beforeEach(vi.clearAllMocks)

  it('renders the component with title', () => {
    // Arrange
    const title = 'Test Title'
    const children = <li data-testid="child">Test Child</li>

    // Act
    render(<FooterList title={title}>{children}</FooterList>)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(1)
    expect(BoxMock).toHaveBeenCalledWith(
      {
        'border-b': 'px',
        'border-b-xl': 'none',
        'border-color': 'gray-light',
        display: 'flex',
        'flex-direction': 'col',
        'gap-y': 4,
        'padding-b': 6,
        children: expect.any(Array),
      },
      undefined,
    )

    expect(HeadingMock).toHaveBeenCalledTimes(1)
    expect(HeadingMock).toHaveBeenCalledWith(
      {
        tag: 'h4',
        children: title,
        'font-size': 'sm',
        'font-weight': 'bold',
      },
      undefined,
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders the component without title', () => {
    // Arrange
    const children = <li>Test Child</li>

    // Act
    render(<FooterList>{children}</FooterList>)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(1)
    expect(HeadingMock).not.toHaveBeenCalled()
  })
})
