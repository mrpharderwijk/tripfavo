import axios from 'axios'
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

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain at least one number',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain at least one special character',
  })

export const SignUpFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    password: passwordSchema,
    passwordConfirm: z.string().min(1, { message: 'Confirm password is required' }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is not the same as confirm password',
        path: ['passwordConfirm'],
      })
    }
  })

type UseSignUpFormReturnType = {
  isLoading: boolean
  onSubmit: (data: FieldValues) => void
  control: Control<z.infer<typeof SignUpFormSchema>>
  handleSubmit: UseFormHandleSubmit<z.infer<typeof SignUpFormSchema>>
  errors: FieldErrors<z.infer<typeof SignUpFormSchema>>
  reset: UseFormReset<z.infer<typeof SignUpFormSchema>>
  error: string | null
  registerSuccess: boolean
}

export function useSignUpForm(): UseSignUpFormReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { enableAppLoading, disableAppLoading } = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
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
      await axios.post('/api/auth/register', { ...data, email: data.email.toLowerCase() })
    } catch (error: any) {
      setError(error.response?.data?.error || 'Something went wrong')
    } finally {
      setIsLoading(false)
      disableAppLoading()
      setRegisterSuccess(true)
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
    registerSuccess,
  }
}
