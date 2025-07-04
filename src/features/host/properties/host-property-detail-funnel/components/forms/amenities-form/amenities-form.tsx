'use client'

import axios from 'axios'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AmenityType } from '@prisma/client'

import { Box } from '@/components/atoms/layout/box/box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Body } from '@/components/atoms/typography/body/body'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { amenities } from '@/constants/amenities'
import {
  HOST_STEP,
  useHostContext,
} from '@/features/host/properties/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/properties/types/component-step-props'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'
import { cn } from '@/utils/class-names'

const EMPTY_FIELD_MESSAGE = 'Field cannot be empty'
const MIN_AMENITIES_LENGTH = 1

const AmenitySchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(AmenityType),
})

export const AmenitiesFormSchema = z.object({
  amenities: z.array(AmenitySchema).min(MIN_AMENITIES_LENGTH, {
    message: `You need to add at least ${MIN_AMENITIES_LENGTH} amenity`,
  }),
})

export function AmenitiesForm({ property }: ComponentStepProps): ReactElement {
  const { currentUser } = useAppContext()
  const tAmenitiesForm = useTranslations('host.property.amenitiesForm')
  const { steps, currentStep, updateStep, setIsLoading, propertyId } =
    useHostContext()
  const form = useForm<z.infer<typeof AmenitiesFormSchema>>({
    resolver: zodResolver(AmenitiesFormSchema),
    mode: 'onChange',
    defaultValues: {
      amenities:
        property?.amenities?.map((amenity) => ({
          type: amenity.type as AmenityType,
          id: amenity.id,
        })) ?? [],
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof AmenitiesFormSchema>,
  ): Promise<boolean> {
    setIsLoading(true)

    const amenitiesData = data.amenities.map((amenity) => amenity.type)

    try {
      await axios.post(
        `/api/host/${currentUser?.id}/properties/${propertyId}/amenities`,
        {
          amenities: amenitiesData,
        },
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
    updateStep(HOST_STEP.Amenities, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tAmenitiesForm('heading.title')}
        subtitle={tAmenitiesForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate>
          {errors.amenities && (
            <p className="text-red-500 text-sm mt-1">
              {errors.amenities.message}
            </p>
          )}
          <FormField
            control={control}
            name="amenities"
            render={({ field }) => (
              <div className="space-y-2">
                <Grid columns-xs={1} columns-sm={2} columns-md={3} gap={4}>
                  {amenities.map(({ label, value, icon: Icon }, idx) => (
                    <GridItem col-span={1} key={value}>
                      <div className="w-full">
                        <Checkbox
                          id={`${value}-${idx}`}
                          checked={field.value.some(
                            (amenity) => amenity.type === value,
                          )}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              field.onChange([
                                ...field.value,
                                { id: undefined, type: value as AmenityType },
                              ])
                            } else {
                              field.onChange(
                                field.value.filter((a) => a.type !== value),
                              )
                            }
                          }}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`${value}-${idx}`}
                          className={cn(
                            'w-full rounded-xl border-1 p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
                            {
                              'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
                                field.value.some((a) => a.type === value),
                              'border-border-tertiary': !field.value.some(
                                (a) => a.type === value,
                              ),
                            },
                          )}
                        >
                          <div className="w-12 h-12 flex justify-start">
                            <Icon
                              className={cn('transition-all duration-300', {
                                'animate-icon-size': field.value.some(
                                  (a) => a.type === value,
                                ),
                                'size-[30px]': !field.value.some(
                                  (a) => a.type === value,
                                ),
                              })}
                              size={30}
                            />
                          </div>
                          <Body
                            size="base-lg"
                            font-weight="semibold"
                            text-align="left"
                            text-overflow="ellipsis"
                            line-clamp={1}
                          >
                            {label}
                          </Body>
                        </Label>
                      </div>
                    </GridItem>
                  ))}
                </Grid>
              </div>
            )}
          />
        </form>
      </Form>
    </Box>
  )
}
