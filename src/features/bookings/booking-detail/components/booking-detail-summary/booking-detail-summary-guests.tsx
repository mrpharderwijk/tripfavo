'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'

import { Divider } from '@/components/atoms/layout/divider/divider'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { InputStep } from '@/components/molecules/input-step/input-step'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { LineAction } from '@/components/organisms/line-action/line-action'
import {
  GuestsAmount,
  useBookingDetailContext,
} from '@/features/bookings/booking-detail/providers/booking-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'

export function BookingDetailSummaryGuests(): ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const adults = searchParams.get('adults')
  const children = searchParams.get('children')
  const infants = searchParams.get('infants')
  const pets = searchParams.get('pets')
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()
  const { listing, totalGuestsAmount, updateGuestsAmount } =
    useBookingDetailContext()
  const [updatedGuestsAmount, setUpdatedGuestsAmount] = useState<GuestsAmount>({
    ...totalGuestsAmount,
    adults: adults ? Number(adults) : totalGuestsAmount.adults,
    children: children ? Number(children) : totalGuestsAmount.children,
    infants: infants ? Number(infants) : totalGuestsAmount.infants,
    pets: pets ? Number(pets) : totalGuestsAmount.pets,
  })
  const tCommon = useTranslations('common')
  const tBookingDetailSummaryGuests = useTranslations(
    'bookingDetail.summary.guests',
  )

  function handleOnClickConfirm(): void {
    updateGuestsAmount({
      ...totalGuestsAmount,
      ...updatedGuestsAmount,
    })

    router.replace(
      `/booking/${listing.id}?startDate=${startDate}&endDate=${endDate}&adults=${updatedGuestsAmount.adults}&children=${updatedGuestsAmount.children}&infants=${updatedGuestsAmount.infants}&pets=${updatedGuestsAmount.pets}`,
    )
    closeDialog()
  }

  return (
    <>
      <LineAction
        label={tBookingDetailSummaryGuests('label')}
        actionElement={
          <Button
            variant="primary-link"
            size="lg"
            onClick={() => openDialog('booking-detail-summary-guests')}
          >
            {tCommon('forms.edit')}
          </Button>
        }
      >
        <Body size="base-md" color="primary">
          {tBookingDetailSummaryGuests('value.adultsAmount', {
            amount: updatedGuestsAmount.adults ?? 1,
          })}
          ,{' '}
          {tBookingDetailSummaryGuests('value.childrenAmount', {
            amount: updatedGuestsAmount.children ?? 0,
          })}
          ,{' '}
          {tBookingDetailSummaryGuests('value.infantsAmount', {
            amount: updatedGuestsAmount.infants ?? 0,
          })}
          ,{' '}
          {tBookingDetailSummaryGuests('value.petsAmount', {
            amount: updatedGuestsAmount.pets ?? 0,
          })}
        </Body>
      </LineAction>
      <ModalDialog
        isVisible={currentOpenDialog === 'booking-detail-summary-guests'}
        onClose={closeDialog}
        showHeaderCloseButton
        closeOnEscape
        closeOnOutsideClick
        header={
          <Heading tag="h3" like="h3-semibold">
            {tBookingDetailSummaryGuests('label')}
          </Heading>
        }
        footer={
          <Button
            variant="secondary"
            size="lg"
            onClick={handleOnClickConfirm}
            fullWidth
          >
            {tBookingDetailSummaryGuests('dialog.button.confirm')}
          </Button>
        }
      >
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body size="base-lgt" font-weight="semibold">
              {tBookingDetailSummaryGuests('dialog.adults.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {tBookingDetailSummaryGuests('dialog.adults.description')}
            </Body>
          </FlexBoxItem>
          <FlexBoxItem flex="initial">
            <InputStep
              id="adultAmount"
              value={updatedGuestsAmount.adults}
              onChange={(value) => {
                setUpdatedGuestsAmount({
                  ...updatedGuestsAmount,
                  adults: Number(value),
                })
              }}
              editable={false}
              min={listing.guestsAmount?.adults === 0 ? 1 : 1}
              max={listing.guestsAmount?.adults ?? undefined}
            />
          </FlexBoxItem>
        </FlexBox>
        <Divider bg-color="deco" />
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body
              size="base-lgt"
              font-weight="semibold"
              color={
                listing.guestsAmount?.children === 0
                  ? 'primary-disabled'
                  : 'primary'
              }
            >
              {tBookingDetailSummaryGuests('dialog.children.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {listing.guestsAmount?.children === 0
                ? tBookingDetailSummaryGuests('dialog.children.notAllowed')
                : tBookingDetailSummaryGuests('dialog.children.description')}
            </Body>
          </FlexBoxItem>
          <FlexBoxItem flex="initial">
            <InputStep
              id="childrenAmount"
              value={updatedGuestsAmount.children}
              onChange={(value) => {
                setUpdatedGuestsAmount({
                  ...updatedGuestsAmount,
                  children: Number(value),
                })
              }}
              editable={false}
              min={0}
              max={listing.guestsAmount?.children ?? undefined}
              disabled={listing.guestsAmount?.children === 0}
            />
          </FlexBoxItem>
        </FlexBox>
        <Divider bg-color="deco" />
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body
              size="base-lgt"
              font-weight="semibold"
              color={
                listing.guestsAmount?.infants === 0
                  ? 'secondary-disabled'
                  : 'primary'
              }
            >
              {tBookingDetailSummaryGuests('dialog.infants.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {listing.guestsAmount?.infants === 0
                ? tBookingDetailSummaryGuests('dialog.infants.notAllowed')
                : tBookingDetailSummaryGuests('dialog.infants.description')}
            </Body>
          </FlexBoxItem>
          <FlexBoxItem flex="initial">
            <InputStep
              id="infantsAmount"
              value={updatedGuestsAmount.infants}
              onChange={(value) => {
                setUpdatedGuestsAmount({
                  ...updatedGuestsAmount,
                  infants: Number(value),
                })
              }}
              editable={false}
              min={0}
              max={listing.guestsAmount?.infants ?? undefined}
              disabled={listing.guestsAmount?.infants === 0}
            />
          </FlexBoxItem>
        </FlexBox>
        <Divider bg-color="deco" />
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body
              size="base-lgt"
              font-weight="semibold"
              color={
                listing.guestsAmount?.pets === 0
                  ? 'primary-disabled'
                  : 'primary'
              }
            >
              {tBookingDetailSummaryGuests('dialog.pets.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {listing.guestsAmount?.pets === 0
                ? tBookingDetailSummaryGuests('dialog.pets.notAllowed')
                : tBookingDetailSummaryGuests('dialog.pets.description')}
            </Body>
          </FlexBoxItem>
          <FlexBoxItem flex="initial">
            <InputStep
              id="petsAmount"
              value={updatedGuestsAmount.pets}
              onChange={(value) => {
                setUpdatedGuestsAmount({
                  ...updatedGuestsAmount,
                  pets: Number(value),
                })
              }}
              editable={false}
              min={0}
              max={listing.guestsAmount?.pets ?? undefined}
              disabled={listing.guestsAmount?.pets === 0}
            />
          </FlexBoxItem>
        </FlexBox>
      </ModalDialog>
    </>
  )
}
