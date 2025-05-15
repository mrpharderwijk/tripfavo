import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './button'
import { ButtonContent } from './components'

jest.mock('./components', () => ({
  ButtonContent: jest.fn(({ children }) => <div>{children}</div>),
}))
const ButtonContentMock = jest.mocked(ButtonContent)

describe('Button', () => {
  it('renders the button with all properties', () => {
    // Arrange & Act
    render(<Button>Click Me</Button>)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button.getAttribute('type')).toBe('button')
    expect(button.className).not.toContain('w-full')
    expect(button.getAttribute('disabled')).toBeFalsy()

    expect(screen.getByText('Click Me')).toBeInTheDocument()

    expect(ButtonContentMock).toHaveBeenCalledTimes(1)
    expect(ButtonContentMock).toHaveBeenCalledWith(
      {
        icon: undefined,
        isLoading: false,
        children: 'Click Me',
      },
      undefined,
    )
  })

  describe('OnClick handler', () => {
    it.each([
      {
        description: 'called',
        props: { disabled: false },
        expected: true,
      },
      {
        description: 'not called',
        props: { onClickMock: jest.fn(), disabled: true },
        expected: false,
      },
    ])('$description', async ({ expected, props }) => {
      // Arrange
      const onClickMock = jest.fn()
      render(
        <Button {...props} onClick={onClickMock}>
          Click Me
        </Button>,
      )

      // Act
      await userEvent.click(screen.getByRole('button'))

      // Assert
      if (expected) {
        expect(onClickMock).toHaveBeenCalledTimes(1)
      } else {
        expect(onClickMock).not.toHaveBeenCalled()
      }
    })
  })

  it('renders with fullWidth class when fullWidth is true', () => {
    // Arrange & Act
    render(<Button fullWidth>Click Me</Button>)

    // Assert
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('renders with loading state', () => {
    // Arrange & Act
    render(<Button isLoading>Click Me</Button>)

    // Assert
    expect(ButtonContentMock).toHaveBeenCalledWith(
      {
        icon: undefined,
        isLoading: true,
        children: 'Click Me',
      },
      undefined,
    )
  })
})
