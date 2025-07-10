'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { LineAction } from '@/components/organisms/line-action/line-action'
import { useGuestBookingDetailContext } from '@/features/guest/bookings/guest-booking-detail/providers/guest-booking-detail-context-provider'

export function GuestBookingDetailSummaryGuests(): ReactElement {
  const { booking } = useGuestBookingDetailContext()
  const tCommon = useTranslations('common')
  const tBookingDetailSummaryGuests = useTranslations(
    'bookingDetail.summary.guests',
  )

  return (
    <>
      <LineAction label={tBookingDetailSummaryGuests('label')}>
        <Body size="base-md" color="primary">
          {tBookingDetailSummaryGuests('value.adultsAmount', {
            amount: booking?.guestsAmount?.adults ?? '?',
          })}
          ,{' '}
          {tBookingDetailSummaryGuests('value.childrenAmount', {
            amount: booking?.guestsAmount?.children ?? '?',
          })}
          ,{' '}
          {tBookingDetailSummaryGuests('value.infantsAmount', {
            amount: booking?.guestsAmount?.infants ?? '?',
          })}
          ,{' '}
          {tBookingDetailSummaryGuests('value.petsAmount', {
            amount: booking?.guestsAmount?.pets ?? '?',
          })}
        </Body>
      </LineAction>
    </>
  )
}
