import { calculateTotalPrice } from './calculate-total-price'

import { DatePrice } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'

const mockPriceDates: DatePrice[] = [
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

describe('calculateTotalPrice', () => {
  it.each([
    {
      description: 'range is undefined',
      range: undefined,
      expected: 0,
    },
    {
      description: 'range.from is undefined',
      range: {
        from: undefined,
        to: new Date('2023-07-15'),
      },
      expected: 0,
    },
    {
      description: 'range.to is undefined',
      range: {
        from: new Date('2023-07-15'),
        to: undefined,
      },
      expected: 0,
    },
    {
      description: 'range is 3 nights in July',
      range: { from: new Date('2023-07-15'), to: new Date('2023-07-18') },
      expected: 750,
    },
    {
      description: 'range is 2 nights in June and 2 nights in July',
      range: { from: new Date('2023-06-29'), to: new Date('2023-07-03') },
      expected: 850,
    },
    {
      description: 'range is 2 nights in January',
      range: { from: new Date('2023-01-01'), to: new Date('2023-01-03') },
      expected: 0,
    },
  ])('returns $expected when $description', ({ range, expected }) => {
    // Arrange & Act
    const result = calculateTotalPrice({
      startDate: range?.from,
      endDate: range?.to,
      datePrices: mockPriceDates,
    })

    // Assert
    expect(result).toBe(expected)
  })
})
