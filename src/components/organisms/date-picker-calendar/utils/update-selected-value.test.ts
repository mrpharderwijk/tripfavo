import { DateRange } from 'react-day-picker'

import { updateSelectedValue } from './update-selected-value'

describe('updateSelectedValue', () => {
  it('handles from date change when from is before to', () => {
    // Arrange
    const prevSelected: DateRange = {
      from: new Date('2023-07-10'),
      to: new Date('2023-07-15'),
    }
    const newDate: DateRange = {
      from: new Date('2023-07-05'),
      to: new Date('2023-07-15'),
    }

    // Act
    const result = updateSelectedValue(prevSelected, newDate)

    // Assert
    expect(result).toEqual({
      from: newDate.from,
      to: undefined,
    })
  })

  it('handles to date change when to is before from', () => {
    // Arrange
    const prevSelected: DateRange = {
      from: new Date('2023-07-15'),
      to: new Date('2023-07-20'),
    }
    const newDate: DateRange = {
      from: new Date('2023-07-15'),
      to: new Date('2023-07-10'),
    }

    // Act
    const result = updateSelectedValue(prevSelected, newDate)

    // Assert
    expect(result).toEqual({
      from: newDate.to,
      to: undefined,
    })
  })

  it('handles when from date is after to date', () => {
    // Arrange
    const prevSelected: DateRange = {
      from: new Date('2023-07-20'),
      to: new Date('2023-07-15'),
    }
    const newDate: DateRange = {
      from: new Date('2023-07-20'),
      to: new Date('2023-07-15'),
    }

    // Act
    const result = updateSelectedValue(prevSelected, newDate)

    // Assert
    expect(result).toEqual({
      from: newDate.to,
      to: undefined,
    })
  })

  it('handles when prevSelected is undefined', () => {
    // Arrange
    const prevSelected = undefined
    const newDate: DateRange = {
      from: new Date('2023-07-05'),
      to: new Date('2023-07-15'),
    }

    // Act
    const result = updateSelectedValue(prevSelected, newDate)

    // Assert
    expect(result).toEqual({
      from: newDate.to,
      to: undefined,
    })
  })
})
