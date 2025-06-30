'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect } from 'react'
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
import {
  HOST_STEP,
  useHostContext,
} from '@/features/host/listings/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/listings/types/component-step-props'

export const GuestsAmountFormSchema = z.object({
  maxGuests: z.number().min(1),
  adults: z.number().min(1),
  children: z.number().min(0),
  infants: z.number().min(0),
  pets: z.number().min(0),
})

export function GuestsAmountForm({
  listing,
}: ComponentStepProps): ReactElement {
  const tGuestsAmountForm = useTranslations('host.listing.guestsAmountForm')
  const {
    steps,
    currentStep,
    updateStep,
    onNextStep,
    setIsLoading,
    listingId,
  } = useHostContext()
  const form = useForm<z.infer<typeof GuestsAmountFormSchema>>({
    resolver: zodResolver(GuestsAmountFormSchema),
    mode: 'onChange',
    defaultValues: {
      maxGuests: listing?.guestsAmount?.maxGuests ?? 1,
      adults: listing?.guestsAmount?.adults ?? 1,
      children: listing?.guestsAmount?.children ?? 0,
      infants: listing?.guestsAmount?.infants ?? 0,
      pets: listing?.guestsAmount?.pets ?? 0,
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof GuestsAmountFormSchema>,
  ): Promise<boolean> {
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
              name="maxGuests"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl" font-weight="medium">
                      {tGuestsAmountForm('maxGuests.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="maxGuests"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={
                        GuestsAmountFormSchema.shape?.maxGuests?.minValue ?? 1
                      }
                      max={
                        GuestsAmountFormSchema.shape?.maxGuests?.maxValue ??
                        undefined
                      }
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="adults"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl" font-weight="medium">
                      {tGuestsAmountForm('adults.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="adults"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={GuestsAmountFormSchema.shape?.adults?.minValue ?? 1}
                      max={
                        GuestsAmountFormSchema.shape?.adults?.maxValue ??
                        undefined
                      }
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="children"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tGuestsAmountForm('children.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="children"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={
                        GuestsAmountFormSchema.shape?.children?.minValue ?? 0
                      }
                      max={
                        GuestsAmountFormSchema.shape?.children?.maxValue ??
                        undefined
                      }
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="infants"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tGuestsAmountForm('infants.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="infants"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={GuestsAmountFormSchema.shape?.infants?.minValue ?? 0}
                      max={
                        GuestsAmountFormSchema.shape?.infants?.maxValue ??
                        undefined
                      }
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="pets"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tGuestsAmountForm('pets.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="pets"
                      value={field.value}
                      onChange={field.onChange}
                      min={GuestsAmountFormSchema.shape?.pets?.minValue ?? 0}
                      max={
                        GuestsAmountFormSchema.shape?.pets?.maxValue ??
                        undefined
                      }
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
