'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { LineAction } from '@/components/organisms/line-action/line-action'
import { useHostReservationDetailContext } from '@/features/host/reservations/host-reservation-detail/providers/host-reservation-detail-context-provider'

export function HostReservationDetailSummaryGuests(): ReactElement {
  const { reservation } = useHostReservationDetailContext()
  const tCommon = useTranslations('common')
  const tReservationDetailSummaryGuests = useTranslations(
    'reservationDetail.summary.guests',
  )

  return (
    <>
      <LineAction label={tReservationDetailSummaryGuests('label')}>
        <Body size="base-md" color="primary">
          {tReservationDetailSummaryGuests('value.adultsAmount', {
            amount: reservation?.guestsAmount?.adults ?? '?',
          })}
          ,{' '}
          {tReservationDetailSummaryGuests('value.childrenAmount', {
            amount: reservation?.guestsAmount?.children ?? '?',
          })}
          ,{' '}
          {tReservationDetailSummaryGuests('value.infantsAmount', {
            amount: reservation?.guestsAmount?.infants ?? '?',
          })}
          ,{' '}
          {tReservationDetailSummaryGuests('value.petsAmount', {
            amount: reservation?.guestsAmount?.pets ?? '?',
          })}
        </Body>
      </LineAction>
    </>
  )
}
