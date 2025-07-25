'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { LocalizedBookingDates } from '@/components/molecules/localized-booking-dates/localized-booking-dates'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { DatePickerCalendar } from '@/components/organisms/date-picker-calendar/date-picker-calendar'
import { handleOnSelectDayPicker } from '@/components/organisms/date-picker-calendar/utils/handle-on-select-day-picker'
import { LineAction } from '@/components/organisms/line-action/line-action'
import { DATE_FORMAT_SEARCH_PARAMS } from '@/constants/dates'
import { useBookingDetailContext } from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { Locale } from '@/i18n/config'

export function BookingDetailSummaryDates(): ReactElement {
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()
  const { selectedDates, updateSelectedDates, property, totalGuestsAmount } =
    useBookingDetailContext()
  const [updatedSelectedDates, setUpdatedSelectedDates] = useState<
    DateRange | undefined
  >(selectedDates)
  const router = useRouter()
  const locale = useLocale()
  const tCommon = useTranslations('common')
  const tBookingDetailSummaryDates = useTranslations(
    'bookingDetail.summary.dates',
  )

  function handleOnClickConfirm(): void {
    if (!updatedSelectedDates?.from || !updatedSelectedDates?.to) {
      return
    }

    updateSelectedDates(updatedSelectedDates)
    const startDate = format(
      updatedSelectedDates?.from,
      DATE_FORMAT_SEARCH_PARAMS,
    )
    const endDate = format(updatedSelectedDates?.to, DATE_FORMAT_SEARCH_PARAMS)

    router.replace(
      `/booking/${property.id}?startDate=${startDate}&endDate=${endDate}&adults=${totalGuestsAmount.adults}&children=${totalGuestsAmount.children}&infants=${totalGuestsAmount.infants}&pets=${totalGuestsAmount.pets}`,
    )
    closeDialog()
  }

  return (
    <>
      <LineAction
        label={tCommon('dates')}
        actionElement={
          <Button
            variant="primary-link"
            size="lg"
            onClick={() => openDialog('booking-detail-summary-dates')}
          >
            {tCommon('forms.edit')}
          </Button>
        }
      >
        <Body size="base-md" color="primary">
          {!!selectedDates?.from && !!selectedDates?.to && (
            <LocalizedBookingDates
              startDate={selectedDates?.from}
              endDate={selectedDates?.to}
              locale={locale as Locale}
            />
          )}
          {!selectedDates?.from && !selectedDates?.to && tCommon('noDates')}
        </Body>
      </LineAction>

      <ModalDialog
        isVisible={currentOpenDialog === 'booking-detail-summary-dates'}
        onClose={closeDialog}
        showHeaderCloseButton
        closeOnEscape
        closeOnOutsideClick
        header={
          <Heading tag="h3" like="h3-semibold">
            {tBookingDetailSummaryDates('label')}
          </Heading>
        }
        footer={
          <>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleOnClickConfirm}
              fullWidth
              disabled={
                !updatedSelectedDates?.from ||
                !updatedSelectedDates?.to ||
                updatedSelectedDates?.from?.toISOString() ===
                  updatedSelectedDates?.to?.toISOString()
              }
            >
              {tBookingDetailSummaryDates('dialog.button.confirm')}
            </Button>
          </>
        }
      >
        <FlexBox flex-direction="col" gap={6}>
          <Body size="base-lgt" color="primary">
            <LocalizedBookingDates
              startDate={updatedSelectedDates?.from}
              endDate={updatedSelectedDates?.to}
              locale={locale as Locale}
            />
          </Body>

          <DatePickerCalendar
            disabledDates={[]}
            priceDates={[]}
            locale={locale as Locale}
            selected={updatedSelectedDates}
            onSelect={(date) =>
              handleOnSelectDayPicker(date, setUpdatedSelectedDates)
            }
          />
        </FlexBox>
      </ModalDialog>
    </>
  )
}
