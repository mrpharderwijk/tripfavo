import { parse } from 'date-fns'

import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'

export type FormatDateStringToDateParams = {
  dateString?: string | null
  dateFormat?: string
}

export function formatDateStringToDateObject({
  dateString,
  dateFormat = DATE_FORMAT_SEARCH_PARAMS,
}: FormatDateStringToDateParams): Date | undefined {
  return dateString ? parse(dateString, dateFormat, new Date()) : undefined
}
