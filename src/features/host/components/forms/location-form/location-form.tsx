'use client'

import axios from 'axios'
import { XIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/atoms/forms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { AddressResult } from '@/components/molecules/address-autocomplete/address-autocomplete'
import { AddressAutocomplete } from '@/components/molecules/address-autocomplete/address-autocomplete'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Form } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'
import { ComponentStepProps } from '@/features/host/types/component-step-props'

type LocationFormType = {
  streetName: string
  houseNumber: string
  city: string
  postalCode: string
  country: string
  province: string
  additionalInfo: string
  aptInfo: string
  latitude: number
  longitude: number
}

export const LocationFormSchema = z.object({
  streetName: z.string().min(1),
  houseNumber: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  province: z.string().min(1),
  additionalInfo: z.string(),
  aptInfo: z.string(),
  latitude: z.number().refine((val) => val !== undefined, {
    message: 'Latitude is required',
  }),
  longitude: z.number().refine((val) => val !== undefined, {
    message: 'Longitude is required',
  }),
})

export function LocationForm({ listing }: ComponentStepProps) {
  const tLocationForm = useTranslations('host.listing.locationForm')
  const { steps, currentStep, updateStep, onNextStep, setIsLoading, listingId } = useHostContext()
  const [inputValue, setInputValue] = useState('')
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null)
  const form = useForm<LocationFormType>({
    resolver: zodResolver(LocationFormSchema),
    mode: 'onChange',
    defaultValues: {
      streetName: listing?.location?.streetName ?? '',
      houseNumber: listing?.location?.houseNumber ?? '',
      city: listing?.location?.city ?? '',
      postalCode: listing?.location?.postalCode ?? '',
      country: listing?.location?.country ?? '',
      province: listing?.location?.province ?? '',
      additionalInfo: listing?.location?.additionalInfo ?? '',
      aptInfo: listing?.location?.aptInfo ?? '',
      latitude: listing?.location?.latitude ?? 0,
      longitude: listing?.location?.longitude ?? 0,
    },
  })
  const {
    formState: { errors },
    control,
  } = form
  const stepData = steps[currentStep as HOST_STEP]
  const formHasValues = Object.values(form.getValues()).some((value) => !!value)

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/atoms/map/map').then((mod) => mod.Map), { ssr: false }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAddress],
  )

  async function onSubmit(data: z.infer<typeof LocationFormSchema>): Promise<boolean> {
    setIsLoading(true)

    try {
      await axios.post(`/api/host/listings/${listingId}/location`, data)
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
    updateStep(HOST_STEP.Location, form as any, onSubmit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleOnChangeAddressAutocomplete(value: string, address?: AddressResult) {
    setInputValue(value)
    setSelectedAddress(address ?? null)

    if (address) {
      processAddressAutocomplete(address)
    }
  }

  function processAddressAutocomplete(address: AddressResult) {
    const streetName = getStreetName(address)
    const houseNumber = address.address.house_number ?? ''
    const city = getCity(address)
    const province = getProvince(address)
    const postalCode = getPostalCode(address)
    const country = getCountry(address)

    if (streetName) {
      form.setValue('streetName', streetName)
    }

    if (houseNumber) {
      form.setValue('houseNumber', houseNumber)
    }

    if (city) {
      form.setValue('city', city)
    }
    if (postalCode) {
      form.setValue('postalCode', postalCode)
    }

    if (country) {
      form.setValue('country', country)
    }

    if (province) {
      form.setValue('province', province)
    }

    if (address.lat) {
      form.setValue('latitude', Number(address.lat))
    }

    if (address.lon) {
      form.setValue('longitude', Number(address.lon))
    }
  }

  function handleOnClickClear() {
    setInputValue('')
    setSelectedAddress(null)
    form.reset()
  }

  function onLatLngChange(position: [number, number]) {
    form.setValue('latitude', Number(position?.[0]))
    form.setValue('longitude', Number(position?.[1]))
  }

  return (
    <Box display="flex" flex-direction="col" gap={11}>
      <HeadingGroup
        title={tLocationForm('heading.title')}
        subtitle={tLocationForm('heading.subtitle')}
      />

      <Form {...form}>
        <form noValidate onSubmit={onNextStep}>
          {!selectedAddress && !formHasValues && (
            <AddressAutocomplete
              value={inputValue}
              selectedAddress={selectedAddress}
              onChange={handleOnChangeAddressAutocomplete}
              disabled={!!selectedAddress}
            />
          )}

          <FlexBox flex-direction="col" gap={2}>
            {(!!selectedAddress || !!formHasValues) &&
              form.getValues('latitude') &&
              form.getValues('longitude') && (
                <FlexBox flex-direction="col" gap={1}>
                  <Map
                    center={[form.getValues('latitude'), form.getValues('longitude')]}
                    zoom={15}
                    onLatLngChange={onLatLngChange}
                    draggablePin
                    dragging
                    zoomControl
                  />
                </FlexBox>
              )}

            {(!!selectedAddress || !!formHasValues) && (
              <FlexBox flex-direction="col" gap={2}>
                <FlexBox flex-direction="row" justify-content="end">
                  <Button variant="outline" icon={XIcon} onClick={handleOnClickClear}>
                    Clear
                  </Button>
                </FlexBox>
                <FlexBox flex-direction="col" gap={2}>
                  <Controller
                    name="aptInfo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="apt"
                        label="Apt, bldg, residence (if applicable)"
                        error={errors.aptInfo?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="additionalInfo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="additionalInfo"
                        label="Building name (if applicable)"
                        error={errors.additionalInfo?.message}
                        {...field}
                      />
                    )}
                  />

                  <FlexBox flex-direction="row" gap={2}>
                    <FlexBoxItem flex="auto">
                      <Controller
                        name="streetName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="streetName"
                            label="Street name"
                            error={errors.streetName?.message}
                            {...field}
                          />
                        )}
                      />
                    </FlexBoxItem>
                    <FlexBoxItem flex="initial" width="1/3">
                      <Controller
                        name="houseNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="houseNumber"
                            label="House number"
                            error={errors.houseNumber?.message}
                            {...field}
                          />
                        )}
                      />
                    </FlexBoxItem>
                  </FlexBox>

                  <Controller
                    name="postalCode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="postalCode"
                        label="Postal code"
                        error={errors.postalCode?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input id="city" label="City" error={errors.city?.message} {...field} />
                    )}
                  />

                  <Controller
                    name="province"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="province"
                        label="State or province"
                        error={errors.province?.message}
                        {...field}
                      />
                    )}
                  />
                </FlexBox>
              </FlexBox>
            )}
          </FlexBox>
        </form>
      </Form>
    </Box>
  )
}

function getStreetName(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'place' && address.type !== 'state' && address.type !== 'postcode') {
    return address.address.name
  }

  return address.address.city ?? ''
}

function getProvince(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'place' && address.type === 'state') {
    return address.address.name
  }

  return address.address.state
}

function getPostalCode(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'place' && address.type === 'postcode') {
    return address.address.name
  }

  return address.address.postcode ?? ''
}

function getCountry(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'place' && address.type === 'country') {
    return address.address.name
  }

  return address.address.country ?? ''
}

function getCity(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'place' && address.type === 'city') {
    return address.address.name
  }

  return address.address.city ?? ''
}
