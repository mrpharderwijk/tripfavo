'use client'

import { Check, Loader2, MapPin } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { ReactElement, useEffect, useRef, useState } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { Input } from '@/components/atoms/forms/input/input'
import { Text } from '@/components/atoms/typography/text/text'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/utils/class-names'

export type AddressResult = {
  place_id: string
  display_name: string
  display_place: string
  class:
    | 'highway'
    | 'place'
    | 'city'
    | 'county'
    | 'state'
    | 'boundary'
    | 'building'
    | 'office'
    | 'railway'
    | 'amenity'
  type:
    | 'residential'
    | 'state'
    | 'administrative'
    | 'county'
    | 'city'
    | 'hamlet'
    | 'village'
    | 'primary'
    | 'neighbourhood'
    | 'town'
    | 'region'
    | 'postcode'
    | 'country'
    | 'government'
    | 'house'
    | 'station'
    | 'theatre'
  address: {
    name?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
    country_code?: string
    road?: string
    house_number?: string
  }
  lat?: number
  lon?: number
}

interface AddressAutocompleteProps {
  label?: string
  placeholder?: string
  onChange?: (value: string, address?: AddressResult) => void
  value?: string
  selectedAddress?: AddressResult | null
  disabled?: boolean
}

export function AddressAutocomplete({
  placeholder,
  onChange,
  value = '',
  selectedAddress,
  disabled = false,
}: AddressAutocompleteProps): ReactElement {
  const [results, setResults] = useState<AddressResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch address suggestions from our API route
  const fetchAddressSuggestions = async (query: string): Promise<void> => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/address?q=${encodeURIComponent(query)}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch address suggestions')
      }

      const data = await response.json()
      console.log(data)
      setResults(data || [])
    } catch (error) {
      console.error('Error fetching address suggestions:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce input to prevent excessive API calls
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (value.length >= 2 && value !== selectedAddress?.display_name) {
      setOpen(true)
      debounceTimerRef.current = setTimeout(() => {
        fetchAddressSuggestions(value)
      }, 500) // 500ms debounce delay
    } else {
      setOpen(false)
      setResults([])
    }

    return (): void => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [value, selectedAddress])

  const handleSelectAddress = (address: AddressResult): void => {
    setOpen(false)

    if (onChange) {
      onChange(address.display_name, address)
    }

    // Return focus to input after selection
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function handleAddressInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const newValue = e.target.value
    onChange?.(newValue, undefined)
  }

  function handleAddressInputFocus(): void {
    if (value.length >= 2) {
      setOpen(true)
    }
  }

  return (
    <div className={cn('space-y-2')}>
      <div className="relative">
        <Input
          label="Location"
          id="location"
          ref={inputRef}
          value={selectedAddress ? selectedAddress.display_name : value}
          onChange={handleAddressInputChange}
          placeholder={placeholder}
          className="w-full"
          autoComplete="off"
          onFocus={handleAddressInputFocus}
          disabled={disabled}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}

        {/* Render dropdown without using PopoverTrigger to avoid focus issues */}
        {open && value.length >= 2 && (
          <div className="absolute top-15 z-50 w-full rounded-md">
            <Command className="rounded-lg border-1 border-border-tertiary shadow-xl">
              <CommandList>
                {isLoading && (
                  <CommandEmpty>
                    <DotLoader size="sm" />
                  </CommandEmpty>
                )}
                {!isLoading && <CommandEmpty>No addresses found</CommandEmpty>}
                <CommandGroup>
                  {results.map((address) => (
                    <CommandItem
                      key={`${address.place_id}-${address.display_name}`}
                      value={address.display_name}
                      onSelect={() => handleSelectAddress(address)}
                      className="flex flex-row items-center gap-2 cursor-pointer hover:bg-grey-400 focus-visible:bg-grey-400 py-3 px-4"
                      tabIndex={0}
                    >
                      <div className="flex flex-initial items-center justify-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-grey-100 rounded-md">
                          <MapPin
                            strokeWidth={1}
                            size={24}
                            className="text-muted-foreground"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-auto">
                        <Text font-size="base-lg" font-weight="medium">
                          {address.display_place}
                        </Text>
                        <Text font-size="base-md">
                          {`${address.address.road ? `${address.address.road}, ` : ``}`}
                          {`${address.address.city && address.address.city !== address.display_place ? `${address.address.city}, ` : ``}`}
                          {`${address.address.state && address.address.state !== address.display_place ? `${address.address.state}, ` : ``}`}
                          {`${address.address.country ? `${address.address.country}` : ``}`}
                        </Text>
                      </div>
                      {selectedAddress?.place_id === address.place_id && (
                        <Check className="h-4 w-4 ml-auto text-green-500" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  )
}
