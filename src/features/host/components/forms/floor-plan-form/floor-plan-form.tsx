'use client'

import axios from 'axios'
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

export const FloorPlanFormSchema = z.object({
  guestCount: z.number().min(1),
  roomCount: z.number().min(1),
  bedroomCount: z.number().min(0),
  bedCount: z.number().min(1),
  bathroomCount: z.number().min(0.5),
})

export function FloorPlanForm({ listing }: ComponentStepProps) {
  const { steps, currentStep, updateStep, onNextStep, setIsLoading, listingId } = useHostContext()
  const form = useForm<z.infer<typeof FloorPlanFormSchema>>({
    resolver: zodResolver(FloorPlanFormSchema),
    mode: 'onChange',
    defaultValues: {
      guestCount: listing?.floorPlan?.guestCount ?? 4,
      roomCount: listing?.floorPlan?.roomCount ?? 1,
      bedroomCount: listing?.floorPlan?.bedroomCount ?? 1,
      bedCount: listing?.floorPlan?.bedCount ?? 1,
      bathroomCount: listing?.floorPlan?.bathroomCount ?? 1,
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(data: z.infer<typeof FloorPlanFormSchema>): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/floor-plan`, data)
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
    updateStep(HOST_STEP.FloorPlan, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="guestCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl" font-weight="medium">
                      Guests
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="guestCount"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={FloorPlanFormSchema.shape?.guestCount?.minValue ?? 1}
                      max={FloorPlanFormSchema.shape?.guestCount?.maxValue ?? undefined}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="roomCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">Rooms (includes living room)</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="roomCount"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={FloorPlanFormSchema.shape?.roomCount?.minValue ?? 1}
                      max={FloorPlanFormSchema.shape?.roomCount?.maxValue ?? undefined}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="bedroomCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">Bedrooms</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="bedroomCount"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={FloorPlanFormSchema.shape?.bedroomCount?.minValue ?? 0}
                      max={FloorPlanFormSchema.shape?.bedroomCount?.maxValue ?? undefined}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="bedCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">Beds</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="bedCount"
                      value={field.value}
                      onChange={field.onChange}
                      min={FloorPlanFormSchema.shape?.bedCount?.minValue ?? 1}
                      max={FloorPlanFormSchema.shape?.bedCount?.maxValue ?? undefined}
                      editable={false}
                    />
                  </FlexBoxItem>
                </FlexBox>
              )}
            />
          </Box>

          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="bathroomCount"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">Bathrooms</Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="bathroomCount"
                      value={field.value}
                      onChange={field.onChange}
                      min={FloorPlanFormSchema.shape?.bathroomCount?.minValue ?? 1}
                      max={FloorPlanFormSchema.shape?.bathroomCount?.maxValue ?? undefined}
                      step={field.value < 1 && field.value > 0 ? 0.5 : 1}
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
