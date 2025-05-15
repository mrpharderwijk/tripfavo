import Link from 'next/link'
import { render } from '@testing-library/react'

import { Branding } from './branding'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div>{children}</div>),
}))
const LinkMock = jest.mocked(Link)

jest.mock('@/components/atoms/layout/box/box', () => ({
  Box: jest.fn(({ children }) => <div>{children}</div>),
}))
const BoxMock = jest.mocked(Box)

jest.mock('@/components/atoms/typography/body/body', () => ({
  Body: jest.fn(({ children }) => <div>{children}</div>),
}))
const BodyMock = jest.mocked(Body)

describe('Branding', () => {
  it('renders the component', () => {
    // Arrange & Act
    render(<Branding />)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(1)
    expect(BoxMock).toHaveBeenCalledWith(
      {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'gap-x': '1.5',
        children: expect.anything(),
      },
      undefined,
    )

    expect(LinkMock).toHaveBeenCalledTimes(2)
    expect(LinkMock).toHaveBeenCalledWith(
      {
        href: '/',
        children: expect.anything(),
      },
      undefined,
    )
    expect(LinkMock).toHaveBeenCalledWith(
      {
        href: '/',
        className: 'p-2',
        children: expect.anything(),
      },
      undefined,
    )

    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenCalledWith(
      {
        tag: 'span',
        size: 'smd',
        'font-weight': 'semibold',
        'data-testid': 'logo',
        children: 'Newsroom',
      },
      undefined,
    )
  })
})
