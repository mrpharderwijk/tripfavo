import { parse } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { LineAction } from '@/components/organisms/line-action/line-action'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useReservationDetailContext } from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'
import { Locales } from '@/i18n/routing'

export function ReservationDetailSummary() {
  const { startDate, endDate } = useReservationDetailContext()
  const locale = useLocale()
  const formattedStartDate = startDate ? parse(startDate, 'yyyy-MM-dd', new Date()) : null
  const formattedEndDate = endDate ? parse(endDate, 'yyyy-MM-dd', new Date()) : null
  const tReservationDetailSummary = useTranslations('reservationDetail.summary')
  const tCommon = useTranslations('common')
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()

  return (
    <FlexBox flex-direction="col" gap={6}>
      <Heading tag="h3" like="h3-semibold">
        {tReservationDetailSummary('heading')}
      </Heading>

      <FlexBox flex-direction="col" gap={6}>
        <LineAction
          label={tCommon('dates')}
          actionElement={
            <Button
              variant="primary-link"
              size="lg"
              onClick={() => openDialog('reservation-detail-summary-dates')}
            >
              {tCommon('forms.edit')}
            </Button>
          }
        >
          <Body size="base-md" color="primary">
            {!!formattedStartDate && !!formattedEndDate && (
              <LocalizedBookingDates
                startDate={formattedStartDate}
                endDate={formattedEndDate}
                locale={locale as Locales}
              />
            )}
            {!formattedStartDate && !formattedEndDate && (
              <Body size="base-md" color="secondary">
                {tCommon('noDates')}
              </Body>
            )}
          </Body>
        </LineAction>
        <ModalDialog
          isVisible={currentOpenDialog === 'reservation-detail-summary-dates'}
          onClose={() => closeDialog('reservation-detail-summary-dates')}
          showHeaderCloseButton
          closeOnEscape
          closeOnOutsideClick
          header={
            <Heading tag="h3" like="h3-semibold">
              {tReservationDetailSummary('dates.label')}
            </Heading>
          }
        ></ModalDialog>

        <LineAction
          label={tReservationDetailSummary('guests.label')}
          actionElement={
            <Button variant="primary-link" size="lg">
              {tCommon('forms.edit')}
            </Button>
          }
        >
          <Body size="base-md" color="primary"></Body>
        </LineAction>
      </FlexBox>
    </FlexBox>
  )
}
