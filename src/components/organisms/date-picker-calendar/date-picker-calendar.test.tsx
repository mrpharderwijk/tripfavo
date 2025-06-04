import { DateRange, DayPicker } from 'react-day-picker'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DatePickerCalendar } from './date-picker-calendar'

import { DatePickerCalendarContextProvider } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'

vi.mock(
  '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider',
  () => ({
    DatePickerCalendarContextProvider: vi.fn(({ children }) => <>{children}</>),
  }),
)
const datePickerCalendarContextProviderMock = vi.mocked(DatePickerCalendarContextProvider)

vi.mock('react-day-picker')
const dayPickerMock = vi.mocked(DayPicker)

const mockDisabledDates = [new Date('2023-07-15')]
const mockPriceDates = [
  {
    startMonth: 6, // July
    endMonth: 7, // August
    price: 250,
  },
]
const mockSelected: DateRange = {
  from: new Date('2023-07-01'),
  to: new Date('2023-07-05'),
}
const mockOnSelect = vi.fn()

describe('DatePickerCalendar', () => {
  beforeEach(vi.clearAllMocks)

  it('renders calendar with correct props', () => {
    // Arrange & Act

    render(
      <DatePickerCalendar
        disabledDates={mockDisabledDates}
        priceDates={mockPriceDates}
        locale="en-US"
        selected={mockSelected}
        onSelect={mockOnSelect}
      />,
    )

    // Assert
    expect(DatePickerCalendarContextProvider).toHaveBeenCalledTimes(1)
    expect(datePickerCalendarContextProviderMock).toHaveBeenCalledWith(
      {
        selected: mockSelected,
        datePrices: mockPriceDates,
        getPriceForDate: expect.any(Function),
        children: expect.anything(),
        components: expect.any(Object),
        defaultMonth: new Date(),
      },
      undefined,
    )

    expect(dayPickerMock).toHaveBeenCalledWith({
      mode: 'single',
      selected: mockSelected,
      onSelect: mockOnSelect,
      disabled: mockDisabledDates,
      locale: 'en-US',
    })
    screen.debug()
    // expect(screen.getByRole('grid')).toBeInTheDocument()
    // expect(screen.getByText('July 2023')).toBeInTheDocument()
  })

  it('handles month navigation', async () => {
    // Arrange
    const user = userEvent.setup()
    render(
      <DatePickerCalendar
        disabledDates={mockDisabledDates}
        priceDates={mockPriceDates}
        locale="en"
        selected={mockSelected}
        onSelect={mockOnSelect}
      />,
    )

    // Act
    const nextButton = screen.getByRole('button', { name: /next month/i })
    await user.click(nextButton)

    // Assert
    expect(screen.getByText('August 2023')).toBeInTheDocument()
  })

  it('disables dates correctly', () => {
    // Arrange & Act
    render(
      <DatePickerCalendar
        disabledDates={mockDisabledDates}
        priceDates={mockPriceDates}
        locale="en"
        selected={mockSelected}
        onSelect={mockOnSelect}
      />,
    )

    // Assert
    const disabledButton = screen.getByRole('button', { name: /15/i })
    expect(disabledButton).toHaveClass('opacity-40')
  })

  it('displays prices for dates', () => {
    // Arrange & Act
    render(
      <DatePickerCalendar
        disabledDates={mockDisabledDates}
        priceDates={mockPriceDates}
        locale="en"
        selected={mockSelected}
        onSelect={mockOnSelect}
      />,
    )

    // Assert
    const priceElements = screen.getAllByText('250')
    expect(priceElements.length).toBeGreaterThan(0)
  })

  it('handles date selection', async () => {
    // Arrange
    const user = userEvent.setup()
    render(
      <DatePickerCalendar
        disabledDates={mockDisabledDates}
        priceDates={mockPriceDates}
        locale="en"
        selected={undefined}
        onSelect={mockOnSelect}
      />,
    )

    // Act
    const dateButton = screen.getByRole('button', { name: /10/i })
    await user.click(dateButton)

    // Assert
    expect(mockOnSelect).toHaveBeenCalled()
  })
})
