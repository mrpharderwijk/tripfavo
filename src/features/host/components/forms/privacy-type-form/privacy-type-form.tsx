'use client'

import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@/components/atoms/layout/box/box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Body } from '@/components/atoms/typography/body/body'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Form, FormField } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { RadioGroup } from '@/components/ui/radio-group'
import { privacyTypes } from '@/constants/privacy-types'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/types/component-step-props'
import { cn } from '@/utils/class-names'

export const PrivacyTypeFormSchema = z.object({
  privacyType: z.enum(privacyTypes.map(({ value }) => value) as [string, ...string[]], {
    required_error: 'You need to select a notification type.',
  }),
})

export function PrivacyTypeForm({ listing }: ComponentStepProps) {
  const { steps, currentStep, updateStep, onNextStep, setIsLoading, listingId, isLoading } =
    useHostContext()
  const form = useForm<z.infer<typeof PrivacyTypeFormSchema>>({
    resolver: zodResolver(PrivacyTypeFormSchema),
    mode: 'onChange',
    defaultValues: {
      privacyType: listing?.privacyType ?? '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(data: z.infer<typeof PrivacyTypeFormSchema>): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/privacy-type`, data)
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
    updateStep(HOST_STEP.PrivacyType, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          {errors.privacyType && (
            <p className="text-red-500 text-sm mt-1">{errors.privacyType.message}</p>
          )}

          <FormField
            control={control}
            name="privacyType"
            render={({ field }) => (
              <div className="space-y-2">
                <RadioGroup {...field} onValueChange={field.onChange} disabled={isLoading}>
                  <Grid grid-cols={1} gap={4}>
                    {privacyTypes.map(({ label, value, icon: Icon, description }, idx) => (
                      <GridItem col-span={1} key={value}>
                        <Box full-width>
                          <RadioGroupItem
                            id={`${value}-${idx}`}
                            value={value}
                            className="peer sr-only"
                            checked={field.value === value}
                            required
                          />
                          <Label
                            htmlFor={`${value}-${idx}`}
                            className={cn(
                              'w-full rounded-xl border-1 p-6 flex flex-row items-center justify-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
                              {
                                'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
                                  field.value === value,
                                'border-border-tertiary': field.value !== value,
                              },
                            )}
                          >
                            <Box display="flex" flex-direction="col" gap={1} max-width="md">
                              <Body size="base-xl" font-weight="semibold" text-align="left">
                                {label}
                              </Body>
                              <Body
                                size="base-md"
                                font-weight="normal"
                                text-align="left"
                                color="grey-700"
                              >
                                {description}
                              </Body>
                            </Box>

                            <Box
                              display="flex"
                              flex="auto"
                              justify-content="end"
                              width={12}
                              height={12}
                            >
                              <Icon
                                className={cn('transition-all duration-300', {
                                  'animate-icon-size': field.value === value,
                                  'size-[30px]': field.value !== value,
                                })}
                                size={30}
                              />
                            </Box>
                          </Label>
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                </RadioGroup>
              </div>
            )}
          />
        </form>
      </Form>
    </Box>
  )
}
