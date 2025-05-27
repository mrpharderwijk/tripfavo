'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ListingFormImage } from '@/components/organisms/listing-form-image/listing-form-image'
import { Form } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
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
  roomType: z.string().optional(),
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

export function ImagesForm() {
  const router = useRouter()
  const { steps, currentStep, updateStep, onNextStep, listing, listingId } = useHostContext()

  const form = useForm<z.infer<typeof ImagesFormSchema>>({
    resolver: zodResolver(ImagesFormSchema),
    mode: 'onChange',
    defaultValues: {
      images: listing?.images.map((image) => ({
        ...image,
        roomType: image?.listingRoom?.room?.value,
      })) ?? [
        {
          alt: '',
          fileHash: '',
          fileKey: '',
          fileName: '',
          fileType: '',
          id: '',
          isMain: false,
          roomType: '',
          size: 0,
          url: '',
        },
      ],
    },
  })
  const {
    control,
    formState: { errors, isValid },
  } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(data: z.infer<typeof ImagesFormSchema>): Promise<boolean> {
    try {
      await axios.post(`/api/host/listings/${listingId}/images`, {
        files: data.images,
      })
      return true
    } catch (error: unknown) {
      console.error(error)
      return false
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
      <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

      {!!Object.values(errors)?.length && (
        <FormNotification variant="info">
          {Object.values(errors).map((error) => (
            <Body key={error.message}>{error.message?.toString()}</Body>
          ))}
        </FormNotification>
      )}

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            {!fields?.length && (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
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
                    await axios.post(`/api/host/listings/${listingId}/images`, {
                      files,
                    })

                    router.refresh()
                  } catch (error: any) {
                    alert(`ERROR prisma! ${error.message}`)
                    console.error(error)
                    return
                  }
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`)
                }}
                onBeforeUploadBegin={(files) => {
                  // Preprocess files before uploading (e.g. rename them)
                  return files.map((f) => new File([f], `${listingId}-${f.name}`, { type: f.type }))
                }}
              />
            )}

            <FlexBox flex-direction="col" gap={6}>
              {fields?.map((field, index) => (
                <ListingFormImage
                  {...field}
                  key={field.fileHash}
                  index={index}
                  control={control}
                  remove={remove}
                />
              ))}
            </FlexBox>
          </Box>
        </form>
      </Form>
    </Box>
  )
}
