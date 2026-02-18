import { format } from 'date-fns'

import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'

export type FormatDateObjectToDateStringParams = {
  date?: Date
  dateFormat?: string
}

export function formatDateObjectToDateString({
  date,
  dateFormat = DATE_FORMAT_SEARCH_PARAMS,
}: FormatDateObjectToDateStringParams): string | undefined {
  return date ? format(date, dateFormat) : undefined
}
