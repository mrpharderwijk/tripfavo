import { render } from '@testing-library/react'

import { FooterDisclaimer } from './footer-disclaimer'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

jest.mock('@/components/atoms/layout/box/box', () => ({
  Box: jest.fn(({ children }) => <>{children}</>),
}))
const BoxMock = jest.mocked(Box)

jest.mock('@/components/atoms/typography/body/body')
const BodyMock = jest.mocked(Body)

jest.mock('@/components/atoms/typography/heading/heading')
const HeadingMock = jest.mocked(Heading)

describe('FooterDisclaimer', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the component with title', () => {
    // Arrange
    const title = 'Test Title'
    const children = 'Test Content'

    // Act
    render(<FooterDisclaimer title={title}>{children}</FooterDisclaimer>)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(2)
    expect(BoxMock).toHaveBeenNthCalledWith(
      1,
      {
        'border-b': 'px',
        'border-b-md': 'px',
        'border-color': 'gray-light',
        display: 'flex',
        'flex-direction': 'col',
        'padding-b': 6,
        'padding-b-xl': 12,
        children: expect.any(Object),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      2,
      {
        display: 'flex',
        'flex-direction': 'col',
        'max-w': '2xl',
        'gap-y': 3,
        children: expect.any(Array),
      },
      undefined,
    )

    expect(HeadingMock).toHaveBeenCalledTimes(1)
    expect(HeadingMock).toHaveBeenCalledWith(
      {
        tag: 'h4',
        like: 'h5',
        children: title,
        'font-weight': 'bold',
      },
      undefined,
    )

    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenCalledWith(
      {
        size: 'sm',
        children,
      },
      undefined,
    )
  })

  it('renders the component without title', () => {
    // Arrange
    const children = 'Test Content'

    // Act
    render(<FooterDisclaimer>{children}</FooterDisclaimer>)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(2)
    expect(HeadingMock).not.toHaveBeenCalled()
    expect(BodyMock).toHaveBeenCalledTimes(1)
  })
})
