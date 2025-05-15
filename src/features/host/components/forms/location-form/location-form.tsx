'use client'

import { XIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/atoms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { AddressResult } from '@/components/molecules/address-autocomplete/address-autocomplete'
import { AddressAutocomplete } from '@/components/molecules/address-autocomplete/address-autocomplete'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { Form } from '@/components/ui/form'
import { HOST_STEP, useHostContext } from '@/features/host/providers/host-context-provider'

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

const LocationFormSchema = z.object({
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

export function LocationForm() {
  const { steps, currentStep, updateStep, onNextStep, storageValue } = useHostContext()
  const [inputValue, setInputValue] = useState('')
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null)
  const form = useForm<LocationFormType>({
    resolver: zodResolver(LocationFormSchema),
    mode: 'onChange',
    defaultValues: {
      streetName: '',
      houseNumber: '',
      city: '',
      postalCode: '',
      country: '',
      province: '',
      additionalInfo: '',
      aptInfo: '',
      latitude: undefined,
      longitude: undefined,
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
      const formKeys = Object.keys(LocationFormSchema.shape) as Array<
        keyof typeof LocationFormSchema.shape
      >
      formKeys.forEach((key) => {
        if (key in currentStepData) {
          form.setValue(key, currentStepData[key as keyof typeof currentStepData])
        }
      })
    }

    // 2. update the step form to the context
    updateStep(HOST_STEP.Location, form as any)

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
    const state = getState(address)
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

    if (state) {
      form.setValue('province', state)
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
    <Container narrow="md" padding={false}>
      <Box display="flex" flex-direction="col" gap={11}>
        <HeadingGroup title={stepData.title} subtitle={stepData.subtitle} />

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
    </Container>
  )
}

function getStreetName(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'highway') {
    return address.address.name
  }

  return address.address.road ?? ''
}

function getCity(address: AddressResult | null) {
  if (!address) {
    return ''
  }

  if (address.class === 'place' && address.type !== 'state' && address.type !== 'postcode') {
    return address.address.name
  }

  return address.address.city ?? ''
}

function getState(address: AddressResult | null) {
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
