import { ReactElement } from 'react'

import { GuestReservationsPage } from '@/features/guest/reservations/guest-reservations/guest-reservations.page'

export default async function ReservationsNextPage(): Promise<ReactElement> {
  return <GuestReservationsPage />
}
