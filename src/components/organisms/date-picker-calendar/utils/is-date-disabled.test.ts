import { isDateDisabled } from './is-date-disabled'

describe('isDateDisabled', () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const disabledDates = [new Date('2023-07-15'), new Date('2023-08-01')]

  it('returns true for dates before today', () => {
    // Arrange & Act
    const result = isDateDisabled(yesterday, disabledDates)

    // Assert
    expect(result).toBe(true)
  })

  it('returns false for today', () => {
    // Arrange & Act
    const result = isDateDisabled(today, disabledDates)

    // Assert
    expect(result).toBe(false)
  })

  it('returns false for future dates that are not disabled', () => {
    // Arrange & Act
    const result = isDateDisabled(tomorrow, disabledDates)

    // Assert
    expect(result).toBe(false)
  })

  it('returns true for dates that are in the disabled dates array', () => {
    // Arrange
    const disabledDate = new Date('2023-07-15')

    // Act
    const result = isDateDisabled(disabledDate, disabledDates)

    // Assert
    expect(result).toBe(true)
  })

  it('returns false when disabled dates array is empty', () => {
    // Arrange & Act
    const result = isDateDisabled(tomorrow, [])

    // Assert
    expect(result).toBe(false)
  })

  it('compares dates correctly regardless of time component', () => {
    // Arrange
    const dateWithTime = new Date('2023-07-15T15:30:00')

    // Act
    const result = isDateDisabled(dateWithTime, disabledDates)

    // Assert
    expect(result).toBe(true)
  })
})
