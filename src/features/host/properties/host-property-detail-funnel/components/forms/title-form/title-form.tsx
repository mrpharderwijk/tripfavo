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

const INPUT_MAX_LENGTH = 120
export const TitleFormSchema = z.object({
  title: z.string().min(30).max(INPUT_MAX_LENGTH),
})

export function TitleForm({ property }: ComponentStepProps): ReactElement {
  const { currentUser } = useAppContext()
  const tTitleForm = useTranslations('host.property.titleForm')
  const { steps, currentStep, updateStep, setIsLoading, propertyId } =
    useHostContext()
  const form = useForm<z.infer<typeof TitleFormSchema>>({
    resolver: zodResolver(TitleFormSchema),
    defaultValues: {
      title: property?.title ?? '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof TitleFormSchema>,
  ): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(
        `/api/host/${currentUser?.id}/properties/${propertyId}/title`,
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
    updateStep(HOST_STEP.Title, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tTitleForm('heading.title')}
        subtitle={tTitleForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate>
          {errors.title && (
            <FormNotification
              variant="danger"
              description={errors.title.message ?? ''}
            />
          )}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <TextArea
                {...field}
                id="title"
                label="Title"
                error={errors.title?.message}
                charCount
                maxLength={INPUT_MAX_LENGTH}
              />
            )}
          />
        </form>
      </Form>
    </Box>
  )
}
