'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextArea } from '@/components/atoms/forms/text-area/text-area'
import { Box } from '@/components/atoms/layout/box/box'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Form, FormField } from '@/components/ui/form'
import {
  HOST_STEP,
  useHostContext,
} from '@/features/host/properties/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/properties/types/component-step-props'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
export const DescriptionFormSchema = z.object({
  description: z.string().min(30).max(500),
})

export function DescriptionForm({
  property,
}: ComponentStepProps): ReactElement {
  const { currentUser } = useAppContext()
  const tDescriptionForm = useTranslations('host.property.descriptionForm')
  const { steps, currentStep, updateStep, setIsLoading, propertyId } =
    useHostContext()
  const form = useForm<z.infer<typeof DescriptionFormSchema>>({
    resolver: zodResolver(DescriptionFormSchema),
    defaultValues: {
      description: property?.description ?? '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof DescriptionFormSchema>,
  ): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(
        `/api/host/${currentUser?.id}/properties/${propertyId}/description`,
        data,
      )
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
      <HeadingGroup
        title={tDescriptionForm('heading.title')}
        subtitle={tDescriptionForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate>
          {errors.description && (
            <FormNotification
              variant="danger"
              description={errors.description.message ?? ''}
            />
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
                min-height={500}
              />
            )}
          />
        </form>
      </Form>
    </Box>
  )
}
