'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form'

import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

type UseLoginFormReturnType = {
  isLoading: boolean
  onSubmit: (data: FieldValues) => void
  control: Control<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  errors: FieldErrors<FieldValues>
  reset: UseFormReset<FieldValues>
  error: string | null
}

export function useLoginForm(): UseLoginFormReturnType {
  const router = useRouter()
  const { enableAppLoading, disableAppLoading } = useAppContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: FieldValues) {
    setIsLoading(true)
    setError(null)
    enableAppLoading()

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false)
        console.log('callback: ', callback)
        if (callback?.error) {
          setError(callback.error)
        }

        if (callback?.ok && !callback?.error) {
          router.refresh()
          reset()
        }
      })
      .finally(() => {
        disableAppLoading()
      })
  }

  return {
    isLoading,
    onSubmit,
    control,
    handleSubmit,
    errors,
    reset,
    error,
  }
}
