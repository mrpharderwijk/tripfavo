import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-base-xs',
        'text-base-sm',
        'text-base-md',
        'text-base-mdt',
        'text-base-lg',
        'text-base-lgt',
        'text-base-xl',
        'text-base-xlt',

        'text-title-xs',
        'text-title-sm',
        'text-title-md',
        'text-title-lg',

        'text-titles-xs-semibold',
        'text-titles-sm-semibold',
        'text-titles-md-semibold',
        'text-titles-lg-semibold',
        'text-titles-xl-semibold',

        'text-titles-sm-medium',
        'text-titles-md-medium',
        'text-titles-lg-medium',
      ],
      'text-color': [
        'text-text-mykonos',
        'sm:text-text-mykonos',
        'md:text-text-mykonos',
        'lg:text-text-mykonos',
        'xl:text-text-mykonos',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs))
}
