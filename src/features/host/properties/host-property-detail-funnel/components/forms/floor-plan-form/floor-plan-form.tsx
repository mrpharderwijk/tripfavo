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
} from '@/features/host/properties/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/properties/types/component-step-props'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export const FloorPlanFormSchema = z.object({
  rooms: z.number().min(1),
  bedrooms: z.number().min(0),
  beds: z.number().min(1),
  bathrooms: z.number().min(0.5),
  livingRooms: z.number().min(0),
  kitchens: z.number().min(0),
})

export function FloorPlanForm({ property }: ComponentStepProps): ReactElement {
  const { currentUser } = useAppContext()
  const tHostPropertyFloorPlanForm = useTranslations(
    'host.property.floorPlanForm',
  )
  const {
    steps,
    currentStep,
    updateStep,
    onNextStep,
    setIsLoading,
    propertyId,
  } = useHostContext()
  const form = useForm<z.infer<typeof FloorPlanFormSchema>>({
    resolver: zodResolver(FloorPlanFormSchema),
    mode: 'onChange',
    defaultValues: {
      rooms: property?.floorPlan?.rooms ?? 1,
      bedrooms: property?.floorPlan?.bedrooms ?? 1,
      beds: property?.floorPlan?.beds ?? 1,
      bathrooms: property?.floorPlan?.bathrooms ?? 1,
      livingRooms: property?.floorPlan?.livingRooms ?? 1,
      kitchens: property?.floorPlan?.kitchens ?? 1,
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof FloorPlanFormSchema>,
  ): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(
        `/api/host/${currentUser?.id}/properties/${propertyId}/floor-plan`,
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
   * This effect is used to Update the step form to the context
   */
  useEffect(() => {
    updateStep(HOST_STEP.FloorPlan, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tHostPropertyFloorPlanForm('heading.title')}
        subtitle={tHostPropertyFloorPlanForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          <Box padding-y={4} border-b={1} border-color="secondary-disabled">
            <FormField
              control={control}
              name="rooms"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tHostPropertyFloorPlanForm('rooms.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="rooms"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={FloorPlanFormSchema.shape?.rooms?.minValue ?? 1}
                      max={
                        FloorPlanFormSchema.shape?.rooms?.maxValue ?? undefined
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
              name="bedrooms"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tHostPropertyFloorPlanForm('bedrooms.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="bedrooms"
                      value={field.value}
                      onChange={field.onChange}
                      editable={false}
                      min={FloorPlanFormSchema.shape?.bedrooms?.minValue ?? 0}
                      max={
                        FloorPlanFormSchema.shape?.bedrooms?.maxValue ??
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
              name="beds"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tHostPropertyFloorPlanForm('beds.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="beds"
                      value={field.value}
                      onChange={field.onChange}
                      min={FloorPlanFormSchema.shape?.beds?.minValue ?? 1}
                      max={
                        FloorPlanFormSchema.shape?.beds?.maxValue ?? undefined
                      }
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
              name="bathrooms"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tHostPropertyFloorPlanForm('bathrooms.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="bathrooms"
                      value={field.value}
                      onChange={field.onChange}
                      min={FloorPlanFormSchema.shape?.bathrooms?.minValue ?? 1}
                      max={
                        FloorPlanFormSchema.shape?.bathrooms?.maxValue ??
                        undefined
                      }
                      step={field.value < 1 && field.value > 0 ? 0.5 : 1}
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
              name="livingRooms"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tHostPropertyFloorPlanForm('livingRooms.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="livingRooms"
                      value={field.value}
                      onChange={field.onChange}
                      min={
                        FloorPlanFormSchema.shape?.livingRooms?.minValue ?? 0
                      }
                      max={
                        FloorPlanFormSchema.shape?.livingRooms?.maxValue ??
                        undefined
                      }
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
              name="kitchens"
              render={({ field }) => (
                <FlexBox flex-direction="row" gap={2}>
                  <FlexBoxItem flex="auto">
                    <Body size="base-xl">
                      {tHostPropertyFloorPlanForm('kitchens.label')}
                    </Body>
                  </FlexBoxItem>
                  <FlexBoxItem flex="initial">
                    <InputStep
                      id="kitchens"
                      value={field.value}
                      onChange={field.onChange}
                      min={FloorPlanFormSchema.shape?.kitchens?.minValue ?? 0}
                      max={
                        FloorPlanFormSchema.shape?.kitchens?.maxValue ??
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
