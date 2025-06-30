'use client'

import axios from 'axios'
import { Euro } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PriceType } from '@prisma/client'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { InputNumber } from '@/components/molecules/input-number/input-number'
import { Form, FormField } from '@/components/ui/form'
import { priceDetails } from '@/constants/price-details'
import {
  HOST_STEP,
  useHostContext,
} from '@/features/host/listings/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/listings/types/component-step-props'

const EMPTY_FIELD_MESSAGE = 'Field cannot be empty'
const MIN_PRICE_DETAILS_LENGTH = 4

const PriceDetailSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(PriceType),
  price: z.number().min(1, { message: EMPTY_FIELD_MESSAGE }),
})

export const PriceFormSchema = z.object({
  priceDetails: z.array(PriceDetailSchema).min(MIN_PRICE_DETAILS_LENGTH, {
    message: `You need to add at least ${MIN_PRICE_DETAILS_LENGTH} images`,
  }),
})

export function PriceForm({ listing }: ComponentStepProps): ReactElement {
  const tPriceForm = useTranslations('host.listing.priceForm')
  const { steps, currentStep, updateStep, setIsLoading, listingId } =
    useHostContext()
  const form = useForm<z.infer<typeof PriceFormSchema>>({
    resolver: zodResolver(PriceFormSchema),
    mode: 'onChange',
    defaultValues: {
      priceDetails: [
        {
          type: PriceType.HIGH_SEASON,
          price:
            listing?.priceDetails?.find(
              (pd) => pd.type === PriceType.HIGH_SEASON,
            )?.price ?? 0.0,
        },
        {
          type: PriceType.MID_SEASON,
          price:
            listing?.priceDetails?.find(
              (pd) => pd.type === PriceType.MID_SEASON,
            )?.price ?? 0.0,
        },
        {
          type: PriceType.LOW_SEASON,
          price:
            listing?.priceDetails?.find(
              (pd) => pd.type === PriceType.LOW_SEASON,
            )?.price ?? 0.0,
        },
        {
          type: PriceType.CLEANING_FEE,
          price:
            listing?.priceDetails?.find(
              (pd) => pd.type === PriceType.CLEANING_FEE,
            )?.price ?? 0.0,
        },
        {
          type: PriceType.DEPOSIT,
          price:
            listing?.priceDetails?.find((pd) => pd.type === PriceType.DEPOSIT)
              ?.price ?? 0.0,
        },
      ],
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]

  async function onSubmit(
    data: z.infer<typeof PriceFormSchema>,
  ): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/price-details`, data)
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
    updateStep(HOST_STEP.Price, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tPriceForm('heading.title')}
        subtitle={tPriceForm('heading.subtitle')}
      />

      {errors.priceDetails && (
        <Body size="base-sm" font-weight="medium" color="secondary-error">
          {errors.priceDetails.message}
        </Body>
      )}

      <Form {...form}>
        <form noValidate>
          {Object.values(priceDetails).map((priceDetail, idx) => (
            <Box
              key={priceDetail.type}
              padding-y={4}
              border-b={
                idx === Object.values(priceDetails).length - 1 ? undefined : 1
              }
              border-color={'secondary-disabled'}
            >
              <FormField
                control={control}
                name={`priceDetails.${idx}`}
                render={({ field }) => (
                  <FlexBox
                    flex-direction="col"
                    flex-direction-sm="row"
                    justify-content="between"
                    gap={4}
                  >
                    <FlexBoxItem
                      display="flex"
                      flex-direction="col"
                      flex="auto"
                      gap={2}
                    >
                      <Body size="base-xl" font-weight="semibold">
                        {priceDetail.label}
                      </Body>
                      <Body
                        size="base-lg"
                        font-weight="normal"
                        color="secondary"
                        padding-r={10}
                      >
                        {priceDetail.description}
                      </Body>
                    </FlexBoxItem>
                    <FlexBoxItem
                      display="flex"
                      flex="initial"
                      align-items="end"
                      justify-content="end"
                    >
                      <InputNumber
                        {...field}
                        error={errors.priceDetails?.[idx]?.price?.message}
                        id={priceDetail.type}
                        value={field.value?.price ?? 0}
                        onChange={(value) =>
                          field.onChange({ ...field.value, price: value })
                        }
                        prefix={<Euro size={16} />}
                      />
                    </FlexBoxItem>
                  </FlexBox>
                )}
              />
            </Box>
          ))}
        </form>
      </Form>
    </Box>
  )
}
