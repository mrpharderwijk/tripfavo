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
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import {
  GuestsAmount,
  useReservationDetailContext,
} from '@/features/reservations/reservation-detail/providers/reservation-detail-context-provider'

export function ReservationDetailSummaryGuests(): ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const adults = searchParams.get('adults')
  const children = searchParams.get('children')
  const infants = searchParams.get('infants')
  const pets = searchParams.get('pets')
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()
  const { listing, totalGuestsAmount, updateGuestsAmount } = useReservationDetailContext()
  const [updatedGuestsAmount, setUpdatedGuestsAmount] = useState<GuestsAmount>({
    ...totalGuestsAmount,
    adults: adults ? Number(adults) : totalGuestsAmount.adults,
    children: children ? Number(children) : totalGuestsAmount.children,
    infants: infants ? Number(infants) : totalGuestsAmount.infants,
    pets: pets ? Number(pets) : totalGuestsAmount.pets,
  })
  const tCommon = useTranslations('common')
  const tReservationDetailSummaryGuests = useTranslations('reservationDetail.summary.guests')

  function handleOnClickConfirm() {
    updateGuestsAmount({
      ...totalGuestsAmount,
      ...updatedGuestsAmount,
    })

    router.replace(
      `/reservation/${listing.id}?startDate=${startDate}&endDate=${endDate}&adults=${updatedGuestsAmount.adults}&children=${updatedGuestsAmount.children}&infants=${updatedGuestsAmount.infants}&pets=${updatedGuestsAmount.pets}`,
    )
    closeDialog('reservation-detail-summary-guests')
  }

  return (
    <>
      <LineAction
        label={tReservationDetailSummaryGuests('label')}
        actionElement={
          <Button
            variant="primary-link"
            size="lg"
            onClick={() => openDialog('reservation-detail-summary-guests')}
          >
            {tCommon('forms.edit')}
          </Button>
        }
      >
        <Body size="base-md" color="primary">
          {tReservationDetailSummaryGuests('value.adultsAmount', {
            amount: updatedGuestsAmount.adults ?? 1,
          })}
          ,{' '}
          {tReservationDetailSummaryGuests('value.childrenAmount', {
            amount: updatedGuestsAmount.children ?? 0,
          })}
          ,{' '}
          {tReservationDetailSummaryGuests('value.infantsAmount', {
            amount: updatedGuestsAmount.infants ?? 0,
          })}
          ,{' '}
          {tReservationDetailSummaryGuests('value.petsAmount', {
            amount: updatedGuestsAmount.pets ?? 0,
          })}
        </Body>
      </LineAction>
      <ModalDialog
        isVisible={currentOpenDialog === 'reservation-detail-summary-guests'}
        onClose={() => closeDialog('reservation-detail-summary-guests')}
        showHeaderCloseButton
        closeOnEscape
        closeOnOutsideClick
        header={
          <Heading tag="h3" like="h3-semibold">
            {tReservationDetailSummaryGuests('label')}
          </Heading>
        }
        footer={
          <Button variant="secondary" size="lg" onClick={handleOnClickConfirm} fullWidth>
            {tReservationDetailSummaryGuests('dialog.button.confirm')}
          </Button>
        }
      >
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body size="base-lgt" font-weight="semibold">
              {tReservationDetailSummaryGuests('dialog.adults.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {tReservationDetailSummaryGuests('dialog.adults.description')}
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
              min={1}
              max={undefined}
            />
          </FlexBoxItem>
        </FlexBox>
        <Divider bg-color="deco" />
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body size="base-lgt" font-weight="semibold">
              {tReservationDetailSummaryGuests('dialog.children.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {tReservationDetailSummaryGuests('dialog.children.description')}
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
              min={1}
              max={undefined}
            />
          </FlexBoxItem>
        </FlexBox>
        <Divider bg-color="deco" />
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body size="base-lgt" font-weight="semibold">
              {tReservationDetailSummaryGuests('dialog.infants.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {tReservationDetailSummaryGuests('dialog.infants.description')}
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
              min={1}
              max={undefined}
            />
          </FlexBoxItem>
        </FlexBox>
        <Divider bg-color="deco" />
        <FlexBox flex-direction="row" gap={2} padding-y={4}>
          <FlexBoxItem display="flex" flex="auto" flex-direction="col" gap={1}>
            <Body size="base-lgt" font-weight="semibold">
              {tReservationDetailSummaryGuests('dialog.pets.label')}
            </Body>
            <Body size="base-mdt" color="secondary" font-weight="medium">
              {tReservationDetailSummaryGuests('dialog.pets.description')}
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
              min={1}
              max={undefined}
            />
          </FlexBoxItem>
        </FlexBox>
      </ModalDialog>
    </>
  )
}
