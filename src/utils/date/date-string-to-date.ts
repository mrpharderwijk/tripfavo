import { parse } from 'date-fns'

import { DATE_FORMAT_DB } from '@/constants/dates'

export function parseDbDateStringToDate(dateString: string): Date {
  console.log('dateString', dateString)
  return parse(dateString, DATE_FORMAT_DB, new Date())
}
