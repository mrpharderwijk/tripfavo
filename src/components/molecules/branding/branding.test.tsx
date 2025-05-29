import Link from 'next/link'
import { render } from '@testing-library/react'

import { Branding } from './branding'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

vi.mock('next/link', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <div>{children}</div>),
}))
const LinkMock = vi.mocked(Link)

vi.mock('@/components/atoms/layout/box/box', () => ({
  Box: vi.fn(({ children }) => <div>{children}</div>),
}))
const BoxMock = vi.mocked(Box)

vi.mock('@/components/atoms/typography/body/body', () => ({
  Body: vi.fn(({ children }) => <div>{children}</div>),
}))
const BodyMock = vi.mocked(Body)

describe('Branding', () => {
  it('renders the component', () => {
    // Arrange & Act
    render(<Branding />)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(1)
    // expect(BoxMock).toHaveBeenCalledWith(
    //   {
    //     display: 'flex',
    //     'align-items': 'center',
    //     'justify-content': 'center',
    //     'gap-x': '1.5',
    //     children: expect.anything(),
    //   },
    //   undefined,
    // )

    // expect(LinkMock).toHaveBeenCalledTimes(2)
    // expect(LinkMock).toHaveBeenCalledWith(
    //   {
    //     href: '/',
    //     children: expect.anything(),
    //   },
    //   undefined,
    // )
    // expect(LinkMock).toHaveBeenCalledWith(
    //   {
    //     href: '/',
    //     className: 'p-2',
    //     children: expect.anything(),
    //   },
    //   undefined,
    // )

    // expect(BodyMock).toHaveBeenCalledTimes(1)
    // expect(BodyMock).toHaveBeenCalledWith(
    //   {
    //     tag: 'span',
    //     size: 'smd',
    //     'font-weight': 'semibold',
    //     'data-testid': 'logo',
    //     children: 'Newsroom',
    //   },
    //   undefined,
    // )
  })
})
