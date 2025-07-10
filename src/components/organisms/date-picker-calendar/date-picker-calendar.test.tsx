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
const datePickerCalendarContextProviderMock = vi.mocked(
  DatePickerCalendarContextProvider,
)

vi.mock('react-day-picker')
const dayPickerMock = vi.mocked(DayPicker)

const disabledDatesMock = [new Date('2023-07-15')]
const priceDatesMock = [
  {
    startMonth: 6, // July
    endMonth: 7, // August
    price: 250,
  },
]
const selectedMock: DateRange = {
  from: new Date('2023-07-01'),
  to: new Date('2023-07-05'),
}
const onSelectMock = vi.fn()
const localeMock = 'en'

describe('DatePickerCalendar', () => {
  beforeEach(vi.clearAllMocks)

  it('renders calendar with correct props', () => {
    // Arrange & Act

    render(
      <DatePickerCalendar
        disabledDates={disabledDatesMock}
        priceDates={priceDatesMock}
        locale={localeMock}
        selected={selectedMock}
        onSelect={onSelectMock}
      />,
    )

    // Assert
    expect(DatePickerCalendarContextProvider).toHaveBeenCalledTimes(1)
    expect(datePickerCalendarContextProviderMock).toHaveBeenCalledWith(
      {
        selected: selectedMock,
        datePrices: priceDatesMock,
        getPriceForDate: expect.any(Function),
        children: expect.anything(),
        components: expect.any(Object),
        defaultMonth: new Date(),
      },
      undefined,
    )

    expect(dayPickerMock).toHaveBeenCalledWith({
      mode: 'single',
      selected: selectedMock,
      onSelect: onSelectMock,
      disabled: disabledDatesMock,
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
        disabledDates={disabledDatesMock}
        priceDates={priceDatesMock}
        locale={localeMock}
        selected={selectedMock}
        onSelect={onSelectMock}
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
        disabledDates={disabledDatesMock}
        priceDates={priceDatesMock}
        locale={localeMock}
        selected={selectedMock}
        onSelect={onSelectMock}
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
        disabledDates={disabledDatesMock}
        priceDates={priceDatesMock}
        locale={localeMock}
        selected={selectedMock}
        onSelect={onSelectMock}
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
        disabledDates={disabledDatesMock}
        priceDates={priceDatesMock}
        locale={localeMock}
        selected={undefined}
        onSelect={onSelectMock}
      />,
    )

    // Act
    const dateButton = screen.getByRole('button', { name: /10/i })
    await user.click(dateButton)

    // Assert
    expect(onSelectMock).toHaveBeenCalled()
  })
})
