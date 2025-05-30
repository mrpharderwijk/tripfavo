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
import { categories } from '@/constants/categories'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/types/component-step-props'
import { cn } from '@/utils/class-names'

export const StructureFormSchema = z.object({
  structure: z.enum(categories.map(({ value }) => value) as [string, ...string[]], {
    required_error: 'You need to select a notification type.',
  }),
})

export function StructureForm({ listing }: ComponentStepProps) {
  const { steps, currentStep, updateStep, setIsLoading, listingId } = useHostContext()
  const form = useForm<z.infer<typeof StructureFormSchema>>({
    resolver: zodResolver(StructureFormSchema),
    mode: 'onChange',
    defaultValues: {
      structure: listing?.structure ?? '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(data: z.infer<typeof StructureFormSchema>): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/structure`, data)
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
    updateStep(HOST_STEP.Structure, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

      <Form {...form}>
        <form noValidate>
          {errors.structure && (
            <p className="text-red-500 text-sm mt-1">{errors.structure.message}</p>
          )}
          <FormField
            control={control}
            name="structure"
            render={({ field }) => (
              <div className="space-y-2">
                <RadioGroup {...field} onValueChange={field.onChange}>
                  <Grid columns={1} columns-sm={2} columns-md={3} gap={4}>
                    {categories.map(({ label, value, icon: Icon }, idx) => (
                      <GridItem col-span={1} key={value}>
                        <div className="w-full">
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
                              'w-full rounded-xl border-1 p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
                              {
                                'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
                                  field.value === value,
                                'border-border-tertiary': field.value !== value,
                              },
                            )}
                          >
                            <div className="w-12 h-12 flex justify-start">
                              <Icon
                                className={cn('transition-all duration-300', {
                                  'animate-icon-size': field.value === value,
                                  'size-[30px]': field.value !== value,
                                })}
                                size={30}
                              />
                            </div>
                            <Body size="base-lg" font-weight="semibold" text-align="left">
                              {label}
                            </Body>
                          </Label>
                        </div>
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
