import { DateRange } from 'react-day-picker'
import { vi } from 'vitest'

import { handleOnSelectDayPicker } from './handle-on-select-day-picker'

describe('handleOnSelectDayPicker', () => {
  const mockSetSelected = vi.fn()
  const disabledDates: Date[] = [new Date('2023-07-15')]

  beforeEach(vi.clearAllMocks)

  it('sets selected to undefined when date is undefined', () => {
    // Arrange
    const date = undefined

    // Act
    handleOnSelectDayPicker(date, mockSetSelected, disabledDates)

    // Assert
    expect(mockSetSelected).toHaveBeenCalledWith(undefined)
  })

  it('updates selected value when range contains disabled date', () => {
    // Arrange
    const date: DateRange = {
      from: new Date('2023-07-14'),
      to: new Date('2023-07-16'),
    }

    // Act
    handleOnSelectDayPicker(date, mockSetSelected, disabledDates)

    // Assert
    expect(mockSetSelected).toHaveBeenCalled()
  })

  it('sets to as undefined when from and to are the same date', () => {
    // Arrange
    const sameDate = new Date('2023-07-14')
    const date: DateRange = {
      from: sameDate,
      to: sameDate,
    }

    // Act
    handleOnSelectDayPicker(date, mockSetSelected, disabledDates)

    // Assert
    expect(mockSetSelected).toHaveBeenCalledWith({
      from: sameDate,
      to: undefined,
    })
  })

  it('sets the date range when valid range is selected', () => {
    // Arrange
    const date: DateRange = {
      from: new Date('2023-07-10'),
      to: new Date('2023-07-12'),
    }

    // Act
    handleOnSelectDayPicker(date, mockSetSelected, disabledDates)

    // Assert
    expect(mockSetSelected).toHaveBeenCalledWith(date)
  })
})
