import { useState } from 'react'
import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form'

type UseRentFormReturnType = {
  isLoading: boolean
  onSubmit: (data: FieldValues) => void
  control: Control<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  errors: FieldErrors<FieldValues>
  reset: UseFormReset<FieldValues>
  error: string | null
  getValues: UseFormGetValues<FieldValues>
}

export function useRentForm(): UseRentFormReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
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
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
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
    isLoading,
    onSubmit,
    control,
    handleSubmit,
    errors,
    reset,
    error,
    getValues,
  }
}
