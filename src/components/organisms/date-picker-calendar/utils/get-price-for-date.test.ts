import { getPriceForDate } from './get-price-for-date'

import { PriceDate } from '@/components/organisms/date-picker-calendar/date-picker-calendar'

const mockPriceDates: PriceDate[] = [
  {
    startMonth: 6, // July
    endMonth: 7, // August
    price: 250,
  },
  {
    startMonth: 3, // April
    endMonth: 5, // June
    price: 175,
  },
]

describe('getPriceForDate', () => {
  it.each([
    {
      description: 'date is in July',
      date: new Date('2023-07-15'),
      expected: 250,
    },
    {
      description: 'date is in April',
      date: new Date('2023-04-15'),
      expected: 175,
    },
    {
      description: 'date is in January (no price defined)',
      date: new Date('2023-01-15'),
      expected: undefined,
    },
    {
      description: 'date is in December (no price defined)',
      date: new Date('2023-12-15'),
      expected: undefined,
    },
    {
      description: 'date is at start of range (April)',
      date: new Date('2023-04-01'),
      expected: 175,
    },
    {
      description: 'date is at end of range (August)',
      date: new Date('2023-08-31'),
      expected: 250,
    },
  ])('returns $expected when $description', ({ date, expected }) => {
    // Arrange & Act
    const result = getPriceForDate(date, mockPriceDates)

    // Assert
    expect(result).toBe(expected)
  })
})
