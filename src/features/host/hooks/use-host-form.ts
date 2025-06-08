'use client'

import { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'

type UseHostFormReturnType = {
  isLoading: boolean
  form: UseFormReturn<FieldValues>
  onSubmit: (data: FieldValues) => void
}

export function useHostForm(): UseHostFormReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      // Structure
      structure: '',

      // Privacy
      privacyType: '',

      // Address
      streetName: '',
      houseNumber: '',
      city: '',
      zipCode: '',
      country: '',
      additionalInfo: '',
      aptInfo: '',

      // Property
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,

      title: '',
      description: '',

      // Guests
      adultsCount: 1,
      childrenCount: 0,
      infantsCount: 0,
      petsCount: 0,
    },
  })

  function onSubmit(data: FieldValues) {
    setIsLoading(true)
    setError(null)

    // axios.post('/api/auth/register', data)
    //   .then(() => {
    //     closeDialog();
    //     reset();
    //   })
    //   .catch((error) => {
    //     setError(error.response?.data?.error || "Something went wrong");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   })
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}
