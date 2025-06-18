import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Input } from './input'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { cn } from '@/utils/class-names'

vi.mock('@/utils/class-names')
const cnMock = vi.mocked(cn)

vi.mock('@/components/atoms/layout/flex-box/flex-box', () => ({
  FlexBox: vi.fn(({ children }) => children),
}))
const FlexBoxMock = vi.mocked(FlexBox)

vi.mock(
  '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item',
  () => ({
    FlexBoxItem: vi.fn(({ children }) => children),
  }),
)
const FlexBoxItemMock = vi.mocked(FlexBoxItem)

describe('Input', () => {
  beforeEach(vi.clearAllMocks)

  it('renders label and input with correct props', () => {
    // Arrange & Act
    render(
      <Input
        id="test-input"
        label="Test Label"
        placeholder="Test Placeholder"
        value=""
      />,
    )

    // Assert
    expect(FlexBoxMock).toHaveBeenCalledTimes(2)
    expect(FlexBoxMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        'flex-direction': 'col',
        gap: 2,
        width: 'full',
        children: expect.anything(),
      }),
      undefined,
    )
    expect(FlexBoxMock).toHaveBeenNthCalledWith(
      2,
      {
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'start',
        gap: undefined,
        children: expect.anything(),
      },
      undefined,
    )
    expect(FlexBoxItemMock).toHaveBeenCalledTimes(1)
    expect(FlexBoxItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        flex: 'auto',
        position: 'relative',
        children: expect.anything(),
      }),
      undefined,
    )
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Label')).toHaveAttribute(
      'id',
      'test-input',
    )
    expect(screen.getByLabelText('Test Label')).toHaveAttribute(
      'placeholder',
      '',
    )
  })

  it('shows floating label when value is present', () => {
    // Arrange & Act
    render(
      <Input
        id="float-input"
        label="Float Label"
        placeholder="Floating"
        value="some value"
      />,
    )
    const input = screen.getByLabelText('Float Label')

    // Assert
    expect(input).toHaveAttribute('placeholder', 'Floating')
  })

  it('shows error message and error styles when error is present', () => {
    // Arrange & Act
    render(
      <Input
        id="error-input"
        label="Error Label"
        placeholder="Error"
        value=""
        error="This is an error"
      />,
    )

    // Assert
    expect(screen.getByText('This is an error')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByLabelText('Error Label')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(screen.getByLabelText('Error Label')).toHaveAttribute(
      'aria-describedby',
      'error-input-error',
    )
  })

  it('does not show error message when disableError is true', () => {
    // Arrange & Act
    render(
      <Input
        id="error-input"
        label="Error Label"
        placeholder="Error"
        value=""
        error="This is an error"
        disableError
      />,
    )

    // Assert
    expect(screen.queryByText('This is an error')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('calls onChange when input value changes', async () => {
    // Arrange
    const handleChange = vi.fn()
    render(
      <Input
        id="change-input"
        label="Change Label"
        placeholder="Change"
        value=""
        onChange={handleChange}
      />,
    )
    const input = screen.getByLabelText('Change Label')

    // Act
    await userEvent.type(input, 'abc')

    // Assert
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders customAction when provided', () => {
    // Arrange
    const CustomAction = <button>Action</button>
    render(
      <Input
        id="custom-action"
        label="Custom Action"
        value=""
        customAction={CustomAction}
      />,
    )

    // Assert
    expect(FlexBoxItemMock).toHaveBeenCalledTimes(2)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('applies disabled styles and disables input', () => {
    // Arrange & Act
    render(<Input id="disabled-input" label="Disabled" value="" disabled />)
    const input = screen.getByLabelText('Disabled')

    // Assert
    expect(input).toBeDisabled()
  })
})
