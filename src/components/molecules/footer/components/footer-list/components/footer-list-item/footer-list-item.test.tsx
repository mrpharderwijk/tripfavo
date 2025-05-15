import { render } from '@testing-library/react'

import { FooterListItem } from './footer-list-item'

import { Body } from '@/components/atoms/typography/body/body'

jest.mock('@/components/atoms/typography/body/body')
const BodyMock = jest.mocked(Body)

describe('FooterListItem', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the component', () => {
    // Arrange
    const childrenMock = 'Test Content'

    // Act
    render(<FooterListItem>{childrenMock}</FooterListItem>)

    // Assert
    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenCalledWith(
      {
        size: 'sm',
        children: childrenMock,
      },
      undefined,
    )
  })
})
