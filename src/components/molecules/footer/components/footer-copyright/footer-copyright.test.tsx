import { render } from '@testing-library/react'

import { FooterCopyright } from './footer-copyright'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

vi.mock('@/components/atoms/layout/box/box', () => ({
  Box: vi.fn(({ children }) => <>{children}</>),
}))
const BoxMock = vi.mocked(Box)

vi.mock('@/components/atoms/typography/body/body')
const BodyMock = vi.mocked(Body)

describe('FooterCopyright', () => {
  beforeEach(vi.clearAllMocks)

  it('renders the component', () => {
    // Arrange
    const currentYear = new Date().getFullYear()

    // Act
    render(<FooterCopyright />)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(4)
    expect(BoxMock).toHaveBeenNthCalledWith(
      1,
      {
        display: 'flex',
        'flex-direction': 'col',
        'flex-direction-lg': 'rowReverse',
        'align-items-lg': 'center',
        'justify-content-md': 'center',
        'justify-content-lg': 'between',
        'padding-b': 6,
        'gap-y': 3,
        children: expect.anything(),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      2,
      {
        display: 'flex',
        'justify-content': 'start',
        'display-md': 'inline-flex',
        'justify-content-md': 'center',
        children: expect.anything(),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      3,
      {
        display: 'flex',
        'justify-content': 'start',
        'display-md': 'inline-flex',
        'justify-content-md': 'center',
        children: expect.any(Object),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      4,
      {
        display: 'inline-flex',
        'flex-direction': 'col',
        'flex-direction-lg': 'row',
        'align-items': 'start',
        'align-items-md': 'center',
        'justify-content': 'center',
        gap: '0.5',
        children: expect.any(Array),
      },
      undefined,
    )

    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenCalledWith(
      {
        tag: 'label',
        size: 'sm',
        children: ['© ', currentYear, ' Whatever, All Rights Reserved'],
      },
      undefined,
    )
  })
})
