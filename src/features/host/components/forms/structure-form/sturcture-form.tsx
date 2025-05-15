'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@/components/atoms/layout/box/box'
import { Container } from '@/components/atoms/layout/container/container'
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
import { cn } from '@/utils/class-names'

export const StructureFormSchema = z.object({
  structure: z.enum(categories.map(({ value }) => value) as [string, ...string[]], {
    required_error: 'You need to select a notification type.',
  }),
})

export default function StructureForm() {
  const { steps, currentStep, updateStep, onNextStep, storageValue } = useHostContext()
  const form = useForm<z.infer<typeof StructureFormSchema>>({
    resolver: zodResolver(StructureFormSchema),
    mode: 'onChange',
    defaultValues: {
      structure: '',
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  /**
   * This effect is used to:
   * 1. !IMPORTANT! set the default value after component mount, otherwise
   *    this will lead to a hydration error
   * 2. Update the step form to the context
   */
  useEffect(() => {
    // 1. Set the default value after component mount
    const currentStepData = storageValue?.[currentStep as HOST_STEP]
    if (currentStepData) {
      const formKeys = Object.keys(StructureFormSchema.shape) as Array<
        keyof typeof StructureFormSchema.shape
      >
      formKeys.forEach((key) => {
        if (key in currentStepData) {
          form.setValue(key, currentStepData[key as keyof typeof currentStepData])
        }
      })
    }

    // 2. update the step form to the context
    updateStep(HOST_STEP.Structure, form as any)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container narrow="md" padding={false}>
      <Box display="flex" flex-direction="col" gap={11}>
        <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

        <Form {...form}>
          <form noValidate onSubmit={onNextStep}>
            {errors.structure && (
              <p className="text-red-500 text-sm mt-1">{errors.structure.message}</p>
            )}
            <FormField
              control={control}
              name="structure"
              render={({ field }) => (
                <div className="space-y-2">
                  <RadioGroup {...field} onValueChange={field.onChange}>
                    <Grid grid-cols={1} grid-cols-md={3} gap={4}>
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
    </Container>
  )
}
