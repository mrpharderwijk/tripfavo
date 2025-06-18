import Link from 'next/link'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Branding } from './branding'

import { Display } from '@/components/atoms/display/display'
import { Box } from '@/components/atoms/layout/box/box'
import { SvgTripfavoDark } from '@/components/atoms/logo/svgr'
import { Body } from '@/components/atoms/typography/body/body'

vi.mock('next/link', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => children),
}))
const LinkMock = vi.mocked(Link)

vi.mock('@/components/atoms/layout/box/box', () => ({
  Box: vi.fn(({ children }) => children),
}))
const BoxMock = vi.mocked(Box)

vi.mock('@/components/atoms/logo/svgr')
const SvgTripfavoDarkMock = vi.mocked(SvgTripfavoDark)

vi.mock('@/components/atoms/display/display', () => ({
  Display: vi.fn(({ children }) => children),
}))
const DisplayMock = vi.mocked(Display)

vi.mock('@/components/atoms/typography/body/body', () => ({
  Body: vi.fn(({ children }) => children),
}))
const BodyMock = vi.mocked(Body)

describe('Branding', () => {
  it('renders the component', () => {
    // Arrange & Act
    render(<Branding />)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(2)
    expect(BoxMock).toHaveBeenNthCalledWith(
      1,
      {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        height: 20,
        children: expect.anything(),
      },
      undefined,
    )
    expect(BoxMock).toHaveBeenNthCalledWith(
      2,
      {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        gap: 1,
        children: expect.anything(),
      },
      undefined,
    )

    expect(LinkMock).toHaveBeenCalledTimes(1)
    expect(LinkMock).toHaveBeenNthCalledWith(
      1,
      {
        href: '/',
        className: '',
        onClick: expect.any(Function),
        children: expect.anything(),
      },
      undefined,
    )

    expect(SvgTripfavoDarkMock).toHaveBeenCalledTimes(1)

    expect(DisplayMock).toHaveBeenCalledTimes(1)
    expect(DisplayMock).toHaveBeenNthCalledWith(
      1,
      {
        'show-lg': true,
        'show-xl': true,
        'show-2xl': true,
        'show-3xl': true,
        children: expect.anything(),
      },
      undefined,
    )

    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenNthCalledWith(
      1,
      {
        tag: 'span',
        size: 'title-sm',
        'font-weight': 'extrabold',
        color: 'purple',
        children: 'tripfavo',
      },
      undefined,
    )
  })

  it('renders the component with a disabled link', async () => {
    // Arrange
    render(<Branding disableLink />)

    // Act
    await userEvent.click(screen.getByRole('link'))

    // Assert
    expect(LinkMock).toHaveBeenCalledTimes(1)
    expect(LinkMock).toHaveBeenNthCalledWith(
      1,
      {
        href: '/',
        className: 'pointer-events-none cursor-none',
        onClick: expect.any(Function),
        children: expect.anything(),
      },
      undefined,
    )
  })
})
