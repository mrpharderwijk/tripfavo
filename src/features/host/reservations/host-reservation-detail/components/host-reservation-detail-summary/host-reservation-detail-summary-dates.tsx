'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { LineAction } from '@/components/organisms/line-action/line-action'
import { useHostReservationDetailContext } from '@/features/host/reservations/host-reservation-detail/providers/host-reservation-detail-context-provider'
import { Locale } from '@/i18n/config'

export function HostReservationDetailSummaryDates(): ReactElement {
  const { reservation } = useHostReservationDetailContext()
  const locale = useLocale()
  const tCommon = useTranslations('common')
  const tReservationDetailSummaryDates = useTranslations(
    'reservationDetail.summary.dates',
  )

  return (
    <>
      <LineAction label={tCommon('dates')}>
        <Body size="base-md" color="primary">
          {!!reservation?.startDate && !!reservation?.endDate && (
            <LocalizedBookingDates
              startDate={reservation?.startDate}
              endDate={reservation?.endDate}
              locale={locale as Locale}
            />
          )}
          {!reservation?.startDate &&
            !reservation?.endDate &&
            tCommon('noDates')}
        </Body>
      </LineAction>
    </>
  )
}
