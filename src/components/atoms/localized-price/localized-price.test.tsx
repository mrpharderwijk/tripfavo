import { render, screen } from '@testing-library/react'

import { LocalizedPrice } from './localized-price'

describe('LocalizedPrice', () => {
  it('formats price in EUR for fr-FR locale', () => {
    // Arrange & Act
    render(<LocalizedPrice price={100} locale="fr-FR" />)

    // Assert
    expect(screen.getByText('100,00 €')).toBeInTheDocument()
  })

  it('formats price in EUR for nl-NL locale', () => {
    // Arrange & Act
    render(<LocalizedPrice price={100} locale="nl-NL" />)

    // Assert
    expect(screen.getByText('€ 100,00')).toBeInTheDocument()
  })

  it('formats price in USD with conversion rate for en-US locale', () => {
    // Arrange & Act
    render(<LocalizedPrice price={100} locale="en-US" />)

    // Assert
    // 100 * 1.142906 ≈ 114.29
    expect(screen.getByText('$114.29')).toBeInTheDocument()
  })

  it('handles string price input', () => {
    // Arrange & Act
    render(<LocalizedPrice price="50.5" locale="fr-FR" />)

    // Assert
    expect(screen.getByText('50,50 €')).toBeInTheDocument()
  })

  it('respects custom fraction digits', () => {
    // Arrange & Act
    render(
      <LocalizedPrice
        price={100.123}
        locale="fr-FR"
        minFractionDigits={1}
        maxFractionDigits={3}
      />,
    )

    // Assert
    expect(screen.getByText('100,123 €')).toBeInTheDocument()
  })

  it('uses default currency and rate when locale is not found', () => {
    // Arrange & Act
    // @ts-expect-error Testing invalid locale
    render(<LocalizedPrice price={100} locale="invalid-locale" />)

    // Assert
    expect(screen.getByText('€100.00')).toBeInTheDocument()
  })
})
