'use client'

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

export const MagicLinkLoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type UseMagicLinkLoginFormReturnType = {
  isLoading: boolean
  control: Control<z.infer<typeof MagicLinkLoginFormSchema>>
  onSubmit: (data: FieldValues) => void
  handleSubmit: UseFormHandleSubmit<z.infer<typeof MagicLinkLoginFormSchema>>
  errors: FieldErrors<z.infer<typeof MagicLinkLoginFormSchema>>
  reset: UseFormReset<z.infer<typeof MagicLinkLoginFormSchema>>
  error: string | null
  isSuccess: boolean
  sentEmail: string | null
  resendMagicLink: () => Promise<void>
  resetForm: () => void
}

export function useMagicLinkLoginForm(): UseMagicLinkLoginFormReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [sentEmail, setSentEmail] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof MagicLinkLoginFormSchema>>({
    resolver: zodResolver(MagicLinkLoginFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function sendMagicLink(email: string): Promise<void> {
    try {
      const signInResponse = await signIn('resend', {
        email,
        redirect: false,
        redirectTo: '/',
      })

      if (signInResponse?.error) {
        // Handle specific Auth.js errors according to documentation
        switch (signInResponse.error) {
          case 'EmailSignin':
            setError('INVALID_EMAIL')
            break
          case 'Verification':
            setError('VERIFICATION_FAILED')
            break
          case 'AccessDenied':
            setError('ACCESS_DENIED')
            break
          case 'Configuration':
            setError('CONFIGURATION_ERROR')
            break
          default:
            setError('SIGNIN_ERROR')
            break
        }
      } else if (signInResponse?.ok) {
        // Success - show success page
        setIsSuccess(true)
        setSentEmail(email)
        setError(null)
      } else {
        // Unknown response state
        setError('SIGNIN_ERROR')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Network or other errors
        if (error.message.includes('fetch')) {
          setError('NETWORK_ERROR')
        } else {
          setError('UNEXPECTED_ERROR')
        }
      } else {
        setError('UNEXPECTED_ERROR')
      }
    }
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    if (!isValid) {
      return
    }

    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    await sendMagicLink(data.email as string)

    setIsLoading(false)
  }

  // Function to resend magic link
  async function resendMagicLink(): Promise<void> {
    if (!sentEmail) {
      return
    }

    setIsLoading(true)
    setError(null)

    await sendMagicLink(sentEmail)

    setIsLoading(false)
  }

  function resetForm(): void {
    reset()
    setIsSuccess(false)
    setSentEmail(null)
    setError(null)
    setIsLoading(false)
  }

  return {
    isLoading,
    onSubmit,
    control,
    handleSubmit,
    errors,
    reset,
    error,
    isSuccess,
    sentEmail,
    resendMagicLink,
    resetForm,
  }
}
