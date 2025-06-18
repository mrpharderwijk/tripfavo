import { render, screen } from '@testing-library/react'

import { DotSeparator } from './dot-separator'

// Arrange & Act are combined since only render is needed

describe('DotSeparator', () => {
  beforeEach(vi.clearAllMocks)

  it('renders a dot separator with correct class and content', () => {
    // Arrange & Act
    render(<DotSeparator />)

    // Assert
    const dot = screen.getByText('·')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('text-gray-500')
    expect(dot).toHaveClass('text-base')
    expect(dot).toHaveClass('h-full')
    expect(dot).toHaveClass('leading-4')
    expect(dot.tagName).toBe('SPAN')
  })
})
