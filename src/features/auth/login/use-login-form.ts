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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

type UseLoginFormReturnType = {
  isLoading: boolean
  control: Control<z.infer<typeof LoginFormSchema>>
  onSubmit: (data: FieldValues) => void
  handleSubmit: UseFormHandleSubmit<z.infer<typeof LoginFormSchema>>
  errors: FieldErrors<z.infer<typeof LoginFormSchema>>
  reset: UseFormReset<z.infer<typeof LoginFormSchema>>
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
    formState: { errors, isValid },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: FieldValues) {
    if (!isValid) {
      return
    }

    setIsLoading(true)
    enableAppLoading()
    setError(null)

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (callback?.error) {
        setError(callback.error)
      }

      if (callback?.ok && !callback?.error) {
        router.refresh()
        reset()
      }
      disableAppLoading()
    } catch (error) {
      setError(error as string)
    } finally {
      setIsLoading(false)
      disableAppLoading()
    }
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
