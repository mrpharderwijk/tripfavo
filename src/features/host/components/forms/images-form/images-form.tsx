'use client'

import axios from 'axios'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Form } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
import { UploadDropzone } from '@/utils/uploadthing'

export const ImagesFormSchema = z.object({
  guestCount: z.number().min(1),
  roomCount: z.number().min(1),
  bedroomCount: z.number().min(0),
  bedCount: z.number().min(1),
  bathroomCount: z.number().min(0.5),
})

export function ImagesForm() {
  const { steps, currentStep, updateStep, onNextStep, listing, listingId } = useHostContext()
  const form = useForm<z.infer<typeof ImagesFormSchema>>({
    resolver: zodResolver(ImagesFormSchema),
    mode: 'onChange',
    defaultValues: {
      guestCount: listing?.floorPlan.guestCount ?? 4,
      roomCount: listing?.floorPlan.roomCount ?? 1,
      bedroomCount: listing?.floorPlan.bedroomCount ?? 1,
      bedCount: listing?.floorPlan.bedCount ?? 1,
      bathroomCount: listing?.floorPlan.bathroomCount ?? 1,
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  function onSubmit(data: z.infer<typeof ImagesFormSchema>): Promise<boolean> {
    console.log(data)
    return Promise.resolve(true)
  }

  /**
   * This effect is used to update the step form to the context
   */
  useEffect(() => {
    updateStep(HOST_STEP.FloorPlan, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            {!listing?.images?.length && (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  // Do something with the response
                  try {
                    await axios.post(`/api/host/listings/${listingId}/images`, {
                      files: res,
                    })

                    alert('Upload Completed')
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
                onUploadBegin={(name) => {
                  // Do something once upload begins
                  console.log('Uploading: ', name)
                }}
              />
            )}

            <FlexBox flex-direction="col" gap={6}>
              {listing?.images?.map((image) => (
                <Image
                  key={image.fileHash}
                  className="aspect-video rounded-2xl"
                  src={image.url}
                  width="1024"
                  height="768"
                  alt={image.fileName}
                />
              ))}
            </FlexBox>
          </Box>
        </form>
      </Form>
    </Box>
  )
}
