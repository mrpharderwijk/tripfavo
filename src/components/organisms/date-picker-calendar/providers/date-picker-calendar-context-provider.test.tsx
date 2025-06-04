import { DateRange } from 'react-day-picker'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import {
  DatePickerCalendarContextProvider,
  useDatePickerCalendarContext,
} from './date-picker-calendar-context-provider'

const mockDatePrices = [
  {
    startMonth: 7,
    endMonth: 8,
    price: 100,
  },
]

const mockSelected: DateRange = {
  from: new Date('2023-07-01'),
  to: new Date('2023-07-05'),
}

const getPriceForDateMock = vi.fn().mockReturnValue(100)

const TestComponent = () => {
  const { selected, datePrices, getPriceForDate } = useDatePickerCalendarContext()

  return (
    <div>
      <span data-testid="selected">{JSON.stringify(selected)}</span>
      <span data-testid="datePrices">{JSON.stringify(datePrices)}</span>
      <span data-testid="price">{getPriceForDate(new Date('2023-07-15'))}</span>
    </div>
  )
}

describe('DatePickerCalendarContextProvider', () => {
  it('provides the context values to children', () => {
    // Arrange & Act
    render(
      <DatePickerCalendarContextProvider
        selected={mockSelected}
        datePrices={mockDatePrices}
        getPriceForDate={getPriceForDateMock}
      >
        <TestComponent />
      </DatePickerCalendarContextProvider>,
    )

    // Assert
    expect(screen.getByTestId('selected')).toHaveTextContent(JSON.stringify(mockSelected))
    expect(screen.getByTestId('datePrices')).toHaveTextContent(JSON.stringify(mockDatePrices))
    expect(screen.getByTestId('price')).toHaveTextContent('100')
    expect(getPriceForDateMock).toHaveBeenCalledWith(new Date('2023-07-15'))
  })

  it('throws error when context is used outside provider', () => {
    // Arrange
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act & Assert
    expect(() => render(<TestComponent />)).toThrow(
      'useDatePickerCalendarContext must be used within a DatePickerCalendarContextProvider',
    )

    consoleError.mockRestore()
  })
})
