'use client'

import axios, { isAxiosError } from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export type VerifyFormData = z.infer<typeof VerifyFormSchema>

export const VerifyFormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
})

type UseVerifyFormReturnType = {
  form: ReturnType<typeof useForm<VerifyFormData>>
  error: Error | null
  isLoadingSubmit: boolean
  isLoadingResend: boolean
  onSubmit: (data: VerifyFormData) => Promise<void>
  onClickResendHandler: () => Promise<void>
}

type UseVerifyOtpFormParams = {
  token?: string
}

export function useVerifyOtpForm({
  token,
}: UseVerifyOtpFormParams): UseVerifyFormReturnType {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { currentUser } = useAppContext()
  const callbackUrl = searchParams.get('callbackUrl')
  const [error, setError] = useState<Error | null>(null)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isLoadingResend, setIsLoadingResend] = useState(false)
  const form = useForm<VerifyFormData>({
    resolver: zodResolver(VerifyFormSchema),
    mode: 'onChange',
    defaultValues: {
      otp: token ?? '',
    },
  })

  async function onSubmit({ otp }: VerifyFormData): Promise<void> {
    setIsLoadingSubmit(true)
    setError(null)

    try {
      await axios.post('/api/auth/otp/verify', {
        otp,
      })

      // NextAuth v5 does not support refresh token, so made a custom credential
      // function to refresh the token, see auth.config.ts
      await signIn('refresh-token', {
        id: currentUser?.id,
        redirect: false,
      })
      router.refresh()
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error?.response?.data as Error)
      }
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  async function onClickResendHandler(): Promise<void> {
    setIsLoadingResend(true)
    setError(null)

    try {
      await axios.post('/api/auth/otp/resend')
      form.reset()
      router.replace(
        `${pathname}${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`,
      )
      router.refresh()
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error?.response?.data as Error)
      }
    } finally {
      setIsLoadingResend(false)
    }
  }

  return {
    form,
    error,
    onSubmit,
    onClickResendHandler,
    isLoadingResend,
    isLoadingSubmit,
  }
}
