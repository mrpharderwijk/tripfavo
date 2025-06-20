import { Locale } from '@/i18n/config'

export type ReservationsParams = {
  params: Promise<{ reservationId: string; locale: Locale }>
}
