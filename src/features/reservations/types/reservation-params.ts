import { Locales } from "@/i18n/routing"

export type ReservationsParams = {
  params: Promise<{ reservationId: string, locale: Locales }>
}