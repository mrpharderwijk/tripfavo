import { PriceType } from '@prisma/client'

export const priceDetails = [
  {
    type: PriceType.HIGH_SEASON,
    label: 'High Season',
    description: 'July and August are the months with the highest demand.',
  },
  {
    type: PriceType.MID_SEASON,
    label: 'Mid Season',
    description:
      'April, May, June, September, October and December are the months with medium demand.',
  },
  {
    type: PriceType.LOW_SEASON,
    label: 'Low Season',
    description: 'November, January, February, March are the months with the lowest demand.',
  },
  {
    type: PriceType.CLEANING_FEE,
    label: 'Cleaning Fee',
    description: 'Cleaning fee is a fee that can be charged for cleaning the property.',
  },
  {
    type: PriceType.DEPOSIT,
    label: 'Deposit',
    description: 'Deposit is a fee that can be charged for a security deposit.',
  },
]
