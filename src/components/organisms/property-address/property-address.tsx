'use client'

import { XIcon } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/components/atoms/forms/input/input'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import {
  AddressAutocomplete,
  AddressResult,
} from '@/components/molecules/address-autocomplete/address-autocomplete'
import { Button } from '@/components/molecules/buttons/button'

type PropertyAddress = {
  streetName?: string
  houseNumber?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  apt?: string
  additionalInfo?: string
}

export function PropertyAddress() {
  const [inputValue, setInputValue] = useState('')
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null)
  const [address, setAddress] = useState<PropertyAddress | null>(null)
  const [apt, setApt] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  function handleOnChangeAddressAutocomplete(value: string, address?: AddressResult) {
    setInputValue(value)
    setSelectedAddress(address ?? null)

    if (address) {
      processAddressAutocomplete(address)
    }
  }

  function handleOnClickClear() {
    setInputValue('')
    setSelectedAddress(null)
  }

  function processAddressAutocomplete(address: AddressResult) {
    const streetName = getStreetName(address)
    const houseNumber = address.address.house_number ?? ''
    const city = getCity(address)
    const state = getState(address)
    const postalCode = getPostalCode(address)
    const country = getCountry(address)

    setAddress({
      streetName,
      houseNumber,
      city,
      state,
      postalCode,
      country,
    })
  }

  return (
    <>
      <AddressAutocomplete
        value={inputValue}
        selectedAddress={selectedAddress}
        onChange={handleOnChangeAddressAutocomplete}
        disabled={!!selectedAddress}
      />
      {!!selectedAddress && (
        <FlexBox flex-direction="col" gap={2}>
          <FlexBox flex-direction="row" justify-content="end">
            <Button variant="outline" icon={XIcon} onClick={handleOnClickClear}>
              Clear
            </Button>
          </FlexBox>
          <FlexBox flex-direction="col" gap={2}>
            <Input
              id="apt"
              label="Apt, bldg, residence (if applicable)"
              value={apt}
              onChange={(e) => setApt(e.target.value)}
            />
            <Input
              id="additionalInfo"
              label="Building name (if applicable)"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
            <FlexBox flex-direction="row" gap={2}>
              <FlexBoxItem flex="auto">
                <Input id="streetName" label="Street name" value={address?.streetName} />
              </FlexBoxItem>
              <FlexBoxItem flex="initial" width="1/3">
                <Input id="houseNumber" label="House number" value={address?.houseNumber} />
              </FlexBoxItem>
            </FlexBox>
            <Input id="postalCode" label="Postal code" value={address?.postalCode} />
            <Input id="city" label="City" value={address?.city} />
            <Input id="state" label="state" value={address?.state} />
          </FlexBox>
        </FlexBox>
      )}
    </>
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
