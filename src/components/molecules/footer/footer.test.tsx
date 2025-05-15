import { render } from '@testing-library/react'

import { Footer } from './footer'

import { Container } from '@/components/atoms/layout/container/container'
import { FooterCopyright } from '@/components/molecules/footer/components/footer-copyright/footer-copyright'
import { FooterDisclaimer } from '@/components/molecules/footer/components/footer-disclaimer/footer-disclaimer'
import { FooterListItem } from '@/components/molecules/footer/components/footer-list/components/footer-list-item/footer-list-item'
import { FooterList } from '@/components/molecules/footer/components/footer-list/footer-list'

jest.mock('@/components/atoms/layout/container/container', () => ({
  Container: jest.fn(({ children }) => <>{children}</>),
}))
const ContainerMock = jest.mocked(Container)

jest.mock(
  '@/components/molecules/footer/components/footer-list/footer-list',
  () => ({
    FooterList: jest.fn(({ children }) => <>{children}</>),
  }),
)
const FooterListMock = jest.mocked(FooterList)

jest.mock(
  '@/components/molecules/footer/components/footer-list/components/footer-list-item/footer-list-item',
)
const FooterListItemMock = jest.mocked(FooterListItem)

jest.mock(
  '@/components/molecules/footer/components/footer-disclaimer/footer-disclaimer',
)
const FooterDisclaimerMock = jest.mocked(FooterDisclaimer)

jest.mock(
  '@/components/molecules/footer/components/footer-copyright/footer-copyright',
)
const FooterCopyrightMock = jest.mocked(FooterCopyright)

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('Footer', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the component', () => {
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
