'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { UploadedFileData } from 'uploadthing/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListingImage, RoomType } from '@prisma/client'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ListingFormImage } from '@/components/organisms/listing-form-image/listing-form-image'
import { Form } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/types/component-step-props'
import { UploadDropzone } from '@/utils/uploadthing'

const EMPTY_FIELD_MESSAGE = 'Field cannot be empty'
const MAX_IMAGES_LENGTH = 10
const MIN_IMAGES_LENGTH = 5

const ImageSchema = z.object({
  id: z.string().optional(),
  fileHash: z.string().min(1, { message: EMPTY_FIELD_MESSAGE }),
  fileKey: z.string().min(1, { message: EMPTY_FIELD_MESSAGE }),
  fileName: z.string().min(1, { message: EMPTY_FIELD_MESSAGE }),
  fileType: z.string().min(1, { message: EMPTY_FIELD_MESSAGE }),
  roomType: z.nativeEnum(RoomType).nullable().optional(),
  size: z.number().min(1, { message: EMPTY_FIELD_MESSAGE }),
  url: z
    .string()
    .min(1, { message: EMPTY_FIELD_MESSAGE })
    .url({ message: 'You must add a valid url' }),
  isMain: z.boolean().optional(),
  alt: z.string().optional(),
})

export const ImagesFormSchema = z.object({
  images: z
    .array(ImageSchema)
    .min(MIN_IMAGES_LENGTH, {
      message: `You need to add at least ${MIN_IMAGES_LENGTH} images`,
    })
    .max(MAX_IMAGES_LENGTH, {
      message: `You can add at most ${MAX_IMAGES_LENGTH} images`,
    }),
})

export function ImagesForm({ listing }: ComponentStepProps) {
  const tListingImagesForm = useTranslations('host.listing.imagesForm')
  const [prismaError, setPrismaError] = useState<string | null>(null)
  const [utError, setUtError] = useState<string | null>(null)
  const { updateStep, listingId, setIsLoading } = useHostContext()
  const [images, setImages] = useState<
    Omit<ListingImage, 'listingId' | 'userId' | 'updatedAt' | 'roomId'>[]
  >(listing?.images || [])
  const sortedImagesByCreatedAt = images?.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  const form = useForm<z.infer<typeof ImagesFormSchema>>({
    resolver: zodResolver(ImagesFormSchema),
    mode: 'onChange',
    defaultValues: {
      images: sortedImagesByCreatedAt?.length
        ? sortedImagesByCreatedAt.map((image) => ({
            ...image,
            roomType: image?.roomType,
          }))
        : [],
    },
  })
  const {
    control,
    formState: { errors },
    setValue,
  } = form
  const { fields, remove } = useFieldArray({
    control,
    name: 'images',
  })

  async function onSubmit(data: z.infer<typeof ImagesFormSchema>): Promise<boolean> {
    setIsLoading(true)
    try {
      await axios.post(`/api/host/listings/${listingId}/images`, {
        files: data.images,
      })
      return true
    } catch (error: unknown) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOnClientUploadComplete(res: UploadedFileData[]) {
    // Do something with the response
    const files = res.map((file) => ({
      ...file,
      url: file.ufsUrl,
      fileHash: file.fileHash,
      fileKey: file.key,
      fileName: file.name,
      fileType: file.type,
      size: file.size,
      isMain: false,
      alt: '',
    }))

    try {
      const response = await axios.post(`/api/host/listings/${listingId}/images`, {
        files,
      })
      const newImages = [...images, ...response.data]
      setImages(newImages)
      setValue('images', newImages)
    } catch (error: any) {
      setPrismaError(error.message)
      return
    }
  }

  function handleOnUploadError(error: Error) {
    // Do something with the error.
    setUtError(error.message)
  }

  function handleOnBeforeUploadBegin(files: File[]) {
    // Preprocess files before uploading (e.g. rename them)
    return files.map((f) => new File([f], `${listingId}-${f.name}`, { type: f.type }))
  }

  async function handleOnChange(): Promise<void> {
    try {
      const { data } = await axios.get(`/api/host/listings/${listingId}/images`)
      setImages(data)
      setValue('images', data)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  /**
   * This effect is used to update the step form to the context
   */
  useEffect(() => {
    updateStep(HOST_STEP.Images, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tListingImagesForm('heading.title')}
        subtitle={tListingImagesForm('heading.subtitle', {
          minImagesAmount: MIN_IMAGES_LENGTH,
        })}
      />

      {!!Object.values(errors)?.length && (
        <FormNotification variant="danger">
          {errors.images?.message && <Body>{errors.images.message}</Body>}
          {errors.images?.root?.message && <Body>{errors.images.root.message}</Body>}
        </FormNotification>
      )}
      {prismaError && <FormNotification variant="danger">{prismaError}</FormNotification>}
      {utError && <FormNotification variant="danger">{utError}</FormNotification>}

      <Form {...form}>
        <form noValidate>
          <FlexBox flex-direction="col" gap={6}>
            {images?.map((field, index) => (
              <Box
                key={`${field.fileHash}-${field.fileKey}-${index}`}
                padding-b={6}
                border-b={index === 0 ? 0 : 1}
                border-color="secondary-disabled"
                position="relative"
              >
                <ListingFormImage
                  {...field}
                  id={field.id}
                  index={index}
                  control={control}
                  remove={remove}
                  onChange={handleOnChange}
                />
              </Box>
            ))}
          </FlexBox>

          {(!fields?.length || fields.length < MAX_IMAGES_LENGTH) && (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={handleOnClientUploadComplete}
              onUploadError={handleOnUploadError}
              onBeforeUploadBegin={handleOnBeforeUploadBegin}
            />
          )}
        </form>
      </Form>
    </Box>
  )
}
