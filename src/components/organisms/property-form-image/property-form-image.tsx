'use client'

import axios from 'axios'
import { Fullscreen, LandPlot, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { Control, useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Box } from '@/components/atoms/layout/box/box'
import { Button } from '@/components/molecules/buttons/button'
import { PropertyFormRoomDialog } from '@/components/organisms/property-form-image/property-form-room-dialog'
import { FormField } from '@/components/ui/form'
import { roomTypes } from '@/constants/room-types'
import { ImagesFormSchema } from '@/features/host/properties/host-property-detail-funnel/components/forms/images-form/images-form'
import { useHostContext } from '@/features/host/properties/providers/host-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

type PropertyFormImageProps = {
  index: number
  control: Control<z.infer<typeof ImagesFormSchema>>
  remove: (index: number) => void
  onChange?: () => void
} & z.infer<typeof ImagesFormSchema>['images'][number]

export function PropertyFormImage({
  control,
  id,
  index,
  url,
  alt,
  isMain,
  onChange,
}: PropertyFormImageProps): ReactElement {
  const { propertyId } = useHostContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const tImagesForm = useTranslations('host.property.imagesForm')
  const { openDialog, currentOpenDialog, closeDialog } = useDialogContext()
  const { getValues } = useFormContext()
  const currentRoomType = getValues(`images.${index}.roomType`)
  const { currentUser } = useAppContext()

  async function handleOnClickRemove(): Promise<void> {
    setIsLoading(true)
    try {
      await axios.delete(
        `/api/host/${currentUser?.id}/properties/${propertyId}/images/${id}`,
      )
      onChange?.()
    } catch (error: unknown) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOnClickMakeMain(): Promise<void> {
    setIsLoading(true)
    try {
      await axios.patch(
        `/api/host/${currentUser?.id}/properties/${propertyId}/images/${id}`,
        {
          isMain: true,
        },
      )
      onChange?.()
    } catch (error: unknown) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOnClickRoomType(): void {
    openDialog(`property-form-room-dialog-${id}`)
  }

  return (
    <Box position="relative">
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center z-10 bg-bg-primary/50">
          <DotLoader />
        </div>
      )}

      {!isLoading && (
        <>
          <Box position="absolute" top={6} left={6}>
            {!isMain && (
              <Button
                icon={Fullscreen}
                variant="quaternary"
                size="md"
                onClick={handleOnClickMakeMain}
              >
                {tImagesForm('makeMainImage')}
              </Button>
            )}
          </Box>

          <Box position="absolute" top={6} right={6}>
            <Button
              icon={Trash}
              variant="quaternary"
              size="md"
              onClick={handleOnClickRemove}
            />
          </Box>

          <Box position="absolute" bottom={6} right={6}>
            <Button
              icon={currentRoomType ? Pencil : LandPlot}
              variant="quaternary"
              size="md"
              onClick={handleOnClickRoomType}
            >
              {roomTypes.find((roomType) => roomType.value === currentRoomType)
                ?.label || tImagesForm('roomDialog.buttonLabel')}
            </Button>

            {id && (
              <FormField
                control={control}
                name={`images.${index}.roomType`}
                render={({ field }) => (
                  <PropertyFormRoomDialog
                    id={id}
                    isOpen={
                      currentOpenDialog === `property-form-room-dialog-${id}`
                    }
                    onClose={closeDialog}
                    index={index}
                    field={field}
                  />
                )}
              />
            )}
          </Box>
        </>
      )}

      <Image
        className="aspect-video rounded-2xl"
        src={url}
        width="1024"
        height="768"
        alt={alt ?? ''}
      />
    </Box>
  )
}
