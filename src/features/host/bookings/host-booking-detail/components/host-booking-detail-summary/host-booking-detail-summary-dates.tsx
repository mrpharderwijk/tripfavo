'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { LineAction } from '@/components/organisms/line-action/line-action'
import { useHostBookingDetailContext } from '@/features/host/bookings/host-booking-detail/providers/host-booking-detail-context-provider'
import { Locale } from '@/i18n/config'
import { parseDbDateStringToDate } from '@/utils/date/date-string-to-date'

export function HostBookingDetailSummaryDates(): ReactElement {
  const { booking } = useHostBookingDetailContext()
  const locale = useLocale()
  const tCommon = useTranslations('common')
  const tBookingDetailSummaryDates = useTranslations(
    'bookingDetail.summary.dates',
  )

  return (
    <>
      <LineAction label={tCommon('dates')}>
        <Body size="base-md" color="primary">
          {!!booking?.startDate && !!booking?.endDate && (
            <LocalizedBookingDates
              startDate={parseDbDateStringToDate(booking?.startDate ?? '')}
              endDate={parseDbDateStringToDate(booking?.endDate ?? '')}
              locale={locale as Locale}
            />
          )}
          {!booking?.startDate && !booking?.endDate && tCommon('noDates')}
        </Body>
      </LineAction>
    </>
  )
}
