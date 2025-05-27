'use client'

import axios from 'axios'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextArea } from '@/components/atoms/forms/text-area/text-area'
import { Box } from '@/components/atoms/layout/box/box'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Form, FormField } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
export const DescriptionFormSchema = z.object({
  description: z.string().min(30).max(500),
})

export function DescriptionForm(): ReactElement {
  const { steps, currentStep, updateStep, setIsLoading, listingId, listing } = useHostContext()
  const form = useForm<z.infer<typeof DescriptionFormSchema>>({
    resolver: zodResolver(DescriptionFormSchema),
    defaultValues: {
      description: listing?.description ?? '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(data: z.infer<typeof DescriptionFormSchema>): Promise<boolean> {
    console.log('onSubmit')
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/description`, data)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * This effect is used to update the step form to the context
   */
  useEffect(() => {
    updateStep(HOST_STEP.Description, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

      <Form {...form}>
        <form noValidate>
          {errors.description && (
            <FormNotification variant="danger">{errors.description.message}</FormNotification>
          )}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <TextArea
                {...field}
                id="description"
                label="Description"
                error={errors.description?.message}
                charCount
                maxLength={500}
              />
            )}
          />
        </form>
      </Form>
    </Box>
  )
}
