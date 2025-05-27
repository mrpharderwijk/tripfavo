'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/atoms/forms/input/input'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Button } from '@/components/molecules/buttons/button'
import { usePersonalInfoContext } from '@/features/account-settings/personal-info/providers/personal-info-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

const LegalNameFormSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
})

export function LegalNameForm(): ReactElement {
  const router = useRouter()
  const { currentUser } = useAppContext()
  const { disableEditMode } = usePersonalInfoContext()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<z.infer<typeof LegalNameFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LegalNameFormSchema),
    defaultValues: {
      firstName: currentUser?.name?.firstName ?? '',
      middleName: currentUser?.name?.middleName ?? '',
      lastName: currentUser?.name?.lastName ?? '',
    },
  })
  const tCommonForms = useTranslations('common.forms')

  async function onSubmit(data: z.infer<typeof LegalNameFormSchema>) {
    if (!data && !isValid && isLoading) {
      return
    }

    setIsLoading(true)

    try {
      await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      disableEditMode()
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexBox flex-direction="col" gap={4}>
        <FlexBoxItem display="flex" flex-direction="row" gap={6}>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: tCommonForms('required', {
                field: tCommonForms('firstName.label'),
              }),
            }}
            disabled={isLoading}
            render={({ field }) => (
              <Input
                id="firstName"
                label={tCommonForms('firstName.label')}
                placeholder={tCommonForms('firstName.placeholder')}
                disabled={false}
                error={errors.firstName?.message?.toString()}
                {...field}
              />
            )}
          />
          <Controller
            name="middleName"
            control={control}
            rules={{
              required: tCommonForms('required', {
                field: tCommonForms('middleName.label'),
              }),
            }}
            render={({ field }) => (
              <Input
                id="middleName"
                label={tCommonForms('middleName.label')}
                placeholder={tCommonForms('middleName.placeholder')}
                disabled={isLoading}
                error={errors.middleName?.message?.toString()}
                {...field}
              />
            )}
          />
        </FlexBoxItem>

        <FlexBoxItem>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: tCommonForms('required', {
                field: tCommonForms('lastName.label'),
              }),
            }}
            disabled={isLoading}
            render={({ field }) => (
              <Input
                id="lastName"
                label={tCommonForms('lastName.label')}
                placeholder={tCommonForms('lastName.placeholder')}
                disabled={false}
                error={errors.lastName?.message?.toString()}
                {...field}
              />
            )}
          />
        </FlexBoxItem>

        <FlexBoxItem display="flex" justify-content="start" gap={2}>
          <Button variant="primary-inverse" type="submit" size="lg" disabled={isLoading}>
            {tCommonForms('saveAndContinue')}
          </Button>
          <Button variant="quaternary" size="lg" onClick={disableEditMode} disabled={isLoading}>
            {tCommonForms('cancel')}
          </Button>
        </FlexBoxItem>
      </FlexBox>
    </form>
  )
}
