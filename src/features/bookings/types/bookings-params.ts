import { Locale } from '@/i18n/config'

export type BookingsParams = {
  params: Promise<{ bookingId: string; locale: Locale }>
}
