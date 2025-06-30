'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'
import { FieldValues } from 'react-hook-form'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Body } from '@/components/atoms/typography/body/body'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { roomTypes } from '@/constants/room-types'
import { useHostContext } from '@/features/host/listings/providers/host-context-provider'
import { cn } from '@/utils/class-names'

type ListingFormRoomDialogProps = {
  id: string
  isOpen: boolean
  onClose: () => void
  index: number
  field: FieldValues
}

export function ListingFormRoomDialog({
  id,
  isOpen,
  onClose,
  field,
}: ListingFormRoomDialogProps): ReactElement {
  const { listingId } = useHostContext()
  const tImagesFormRoomDialog = useTranslations(
    'host.listing.imagesForm.roomDialog',
  )

  async function handleOnClickConfirm(): Promise<void> {
    try {
      await axios.patch(`/api/host/listings/${listingId}/images/${id}`, {
        roomType: field.value,
      })

      onClose()
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <ModalDialog
      header={<>{tImagesFormRoomDialog('header')}</>}
      footer={
        <Button
          variant="primary-inverse"
          size="lg"
          onClick={handleOnClickConfirm}
        >
          Confirm
        </Button>
      }
      isVisible={isOpen}
      onClose={onClose}
    >
      <FlexBox flex-direction="col" gap={6}>
        <HeadingGroup
          title={tImagesFormRoomDialog('heading')}
          subtitle={tImagesFormRoomDialog('subtitle')}
        />

        <RadioGroup value={field.value ?? ''} onValueChange={field.onChange}>
          <Grid columns={1} columns-md={3} gap={4}>
            {roomTypes.map(({ label, value, icon: Icon }, idx) => (
              <GridItem col-span={1} key={label}>
                <div className="w-full">
                  <RadioGroupItem
                    id={`${value}-${idx}`}
                    value={value}
                    className="peer sr-only"
                    checked={field.value === value}
                    required
                  />
                  <Label
                    htmlFor={`${value}-${idx}`}
                    className={cn(
                      'w-full rounded-xl border-1 p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
                      {
                        'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
                          field.value === value,
                        'border-border-tertiary': field.value !== value,
                      },
                    )}
                  >
                    <div className="w-12 h-12 flex justify-start">
                      <Icon
                        className={cn('transition-all duration-300', {
                          'animate-icon-size': field.value === value,
                          'size-[30px]': field.value !== value,
                        })}
                        size={30}
                      />
                    </div>
                    <Body
                      size="base-lg"
                      font-weight="semibold"
                      text-align="left"
                    >
                      {label}
                    </Body>
                  </Label>
                </div>
              </GridItem>
            ))}
          </Grid>
        </RadioGroup>
      </FlexBox>
    </ModalDialog>
  )
}
