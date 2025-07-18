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

const INPUT_MAX_LENGTH = 1000
export const NeighbourhoodDescriptionFormSchema = z.object({
  neighbourhoodDescription: z.string().min(30).max(INPUT_MAX_LENGTH),
})

export function NeighbourhoodDescriptionForm({
  property,
}: ComponentStepProps): ReactElement {
  const { currentUser } = useAppContext()
  const tNeighbourhoodDescriptionForm = useTranslations(
    'host.property.neighbourhoodDescriptionForm',
  )
  const { steps, currentStep, updateStep, setIsLoading, propertyId } =
    useHostContext()
  const form = useForm<z.infer<typeof NeighbourhoodDescriptionFormSchema>>({
    resolver: zodResolver(NeighbourhoodDescriptionFormSchema),
    defaultValues: {
      neighbourhoodDescription: property?.neighbourhoodDescription ?? '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof NeighbourhoodDescriptionFormSchema>,
  ): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(
        `/api/host/${currentUser?.id}/properties/${propertyId}/neighbourhood-description`,
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
    updateStep(HOST_STEP.NeighbourhoodDescription, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tNeighbourhoodDescriptionForm('heading.title')}
        subtitle={tNeighbourhoodDescriptionForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate>
          {errors.neighbourhoodDescription && (
            <FormNotification
              variant="danger"
              description={errors.neighbourhoodDescription.message ?? ''}
            />
          )}
          <FormField
            control={control}
            name="neighbourhoodDescription"
            render={({ field }) => (
              <TextArea
                {...field}
                id="neighbourhoodDescription"
                label={tNeighbourhoodDescriptionForm('inputLabel')}
                error={errors.neighbourhoodDescription?.message}
                charCount
                maxLength={INPUT_MAX_LENGTH}
                min-height={500}
              />
            )}
          />
        </form>
      </Form>
    </Box>
  )
}
