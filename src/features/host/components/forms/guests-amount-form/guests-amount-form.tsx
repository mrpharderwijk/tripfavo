'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { InputStep } from '@/components/molecules/input-step/input-step'
import { Form, FormField } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/types/component-step-props'

export const GuestsAmountFormSchema = z.object({
  adultsCount: z.number().min(1),
  childrenCount: z.number().min(0),
  infantsCount: z.number().min(0),
  petsCount: z.number().min(0),
})

export function GuestsAmountForm({ listing }: ComponentStepProps) {
  const tGuestsAmountForm = useTranslations('host.listing.guestsAmountForm')
  const { steps, currentStep, updateStep, onNextStep, setIsLoading, listingId } = useHostContext()
  const form = useForm<z.infer<typeof GuestsAmountFormSchema>>({
    resolver: zodResolver(GuestsAmountFormSchema),
    mode: 'onChange',
    defaultValues: {
      adultsCount: listing?.guestsAmount?.adultsCount ?? 1,
      childrenCount: listing?.guestsAmount?.childrenCount ?? 0,
      infantsCount: listing?.guestsAmount?.infantsCount ?? 0,
      petsCount: listing?.guestsAmount?.petsCount ?? 0,
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(data: z.infer<typeof GuestsAmountFormSchema>): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/guests-amount`, data)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * This effect is used to Update the step form to the context
   */
  useEffect(() => {
    updateStep(HOST_STEP.GuestsAmount, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tGuestsAmountForm('heading.title')}
        subtitle={tGuestsAmountForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="adultsCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl" font-weight="medium">
                      {tGuestsAmountForm('adultsCount.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="adultsCount"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={GuestsAmountFormSchema.shape?.adultsCount?.minValue ?? 1}
                      max={GuestsAmountFormSchema.shape?.adultsCount?.maxValue ?? undefined}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="childrenCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">{tGuestsAmountForm('childrenCount.label')}</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="childrenCount"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={GuestsAmountFormSchema.shape?.childrenCount?.minValue ?? 0}
                      max={GuestsAmountFormSchema.shape?.childrenCount?.maxValue ?? undefined}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="infantsCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">{tGuestsAmountForm('infantsCount.label')}</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="infantsCount"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={GuestsAmountFormSchema.shape?.infantsCount?.minValue ?? 0}
                      max={GuestsAmountFormSchema.shape?.infantsCount?.maxValue ?? undefined}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="petsCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">{tGuestsAmountForm('petsCount.label')}</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="petsCount"
                      value={field.value}
                      onChange={field.onChange}
                      min={GuestsAmountFormSchema.shape?.petsCount?.minValue ?? 0}
                      max={GuestsAmountFormSchema.shape?.petsCount?.maxValue ?? undefined}
                      editable={false}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>
        </form>
      </Form>
    </Box>
  )
}
