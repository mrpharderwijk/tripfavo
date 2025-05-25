'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { BaseSyntheticEvent, useState } from 'react'
import { Control, FieldErrors, FieldValues, useForm, UseFormReset } from 'react-hook-form'

import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

type UseLoginFormReturnType = {
  isLoading: boolean
  control: Control<FieldValues>
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
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
  console.log('formState: ', errors)

  async function onSubmit(data: FieldValues) {
    console.log('formState: ', errors)
    setIsLoading(true)
    setError(null)
    enableAppLoading()

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (callback?.error) {
        setError(callback.error)
      }

      if (callback?.ok && !callback?.error) {
        console.log('callback?.ok: ', callback?.ok)
        router.refresh()
        reset()
      }
      disableAppLoading()
    } catch (error) {
      console.log('error: ', error)
      setError(error as string)
      disableAppLoading()
    }
  }

  return {
    isLoading,
    submit: handleSubmit(onSubmit),
    control,
    errors,
    reset,
    error,
  }
}
