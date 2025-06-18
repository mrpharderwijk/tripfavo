import { render } from '@testing-library/react'
import React from 'react'

import { Footer } from './footer'

import { Container } from '@/components/atoms/layout/container/container'
import { FooterCopyright } from '@/components/molecules/footer/components/footer-copyright/footer-copyright'
import { FooterDisclaimer } from '@/components/molecules/footer/components/footer-disclaimer/footer-disclaimer'
import { FooterListItem } from '@/components/molecules/footer/components/footer-list/components/footer-list-item/footer-list-item'
import { FooterList } from '@/components/molecules/footer/components/footer-list/footer-list'

vi.mock('@/components/atoms/layout/container/container', () => ({
  Container: vi.fn(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )),
}))
const ContainerMock = vi.mocked(Container)

vi.mock(
  '@/components/molecules/footer/components/footer-list/footer-list',
  () => ({
    FooterList: vi.fn(({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    )),
  }),
)
const FooterListMock = vi.mocked(FooterList)

vi.mock(
  '@/components/molecules/footer/components/footer-list/components/footer-list-item/footer-list-item',
)
const FooterListItemMock = vi.mocked(FooterListItem)

vi.mock(
  '@/components/molecules/footer/components/footer-disclaimer/footer-disclaimer',
)
const FooterDisclaimerMock = vi.mocked(FooterDisclaimer)

vi.mock(
  '@/components/molecules/footer/components/footer-copyright/footer-copyright',
)
const FooterCopyrightMock = vi.mocked(FooterCopyright)

// Mock the translation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('Footer', (): void => {
  beforeEach(vi.clearAllMocks)

  it('renders the component', (): void => {
    // Arrange
    render(<Footer />)

    // Assert
    expect(ContainerMock).toHaveBeenCalledTimes(1)
    expect(ContainerMock).toHaveBeenCalledWith(
      {
        className: 'flex flex-col gap-y-6',
        children: expect.any(Array),
      },
      undefined,
    )

    expect(FooterListMock).toHaveBeenCalledTimes(3)
    expect(FooterListMock).toHaveBeenCalledWith(
      {
        title: 'Support',
        children: expect.anything(),
      },
      undefined,
    )

    expect(FooterListItemMock).toHaveBeenCalledTimes(18)
    expect(FooterListItemMock).toHaveBeenCalledWith(
      {
        children: expect.anything(),
      },
      undefined,
    )

    expect(FooterDisclaimerMock).toHaveBeenCalledTimes(1)
    expect(FooterDisclaimerMock).toHaveBeenCalledWith(
      {
        title: 'Disclaimer',
        children: expect.anything(),
      },
      undefined,
    )

    expect(FooterCopyrightMock).toHaveBeenCalledTimes(1)
  })
})
