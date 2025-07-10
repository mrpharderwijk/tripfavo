import { render } from '@testing-library/react'

import { ButtonContent } from './button-content'
import { TID_BUTTON_LOADER as TID_BUTTON_LOADER_OLD } from './button-content'

describe('ButtonContent', () => {
  it('renders the component', () => {
    // Arrange & Act
    const { container } = render(
      <ButtonContent>Just a button content</ButtonContent>,
    )

    // Assert
    expect(container).toBeInTheDocument()
    expect(container.firstChild).toHaveTextContent('Just a button content')
  })

  it.each([
    {
      case: 'shows a loader when the isLoading prop is true',
      isLoading: true,
    },
    {
      case: 'hides a loader when the isLoading prop is false',
      isLoading: false,
    },
  ])('$case', ({ isLoading }) => {
    // Arrange & Act
    const { queryByTestId } = render(
      <ButtonContent loading={isLoading}>
        Just a button content
      </ButtonContent>,
    )

    // Assert
    if (isLoading) {
      expect(queryByTestId(TID_BUTTON_LOADER_OLD)).toBeInTheDocument()
    }

    if (!isLoading) {
      expect(queryByTestId(TID_BUTTON_LOADER_OLD)).not.toBeInTheDocument()
    }
  })
})
