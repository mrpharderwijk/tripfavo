'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'
import { ReactElement, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/atoms/forms/input/input'
import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { getRoutePathByRouteName } from '@/utils/get-route'

const OnboardingFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  profileImage: z.any().optional(),
})

type OnboardingFormData = z.infer<typeof OnboardingFormSchema>

export function OnboardingForm(): ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  )

  const tOnboarding = useTranslations('auth.onboarding')
  const tCommon = useTranslations('common')

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
  })

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0]
    if (file) {
      setProfileImageFile(file)
      const reader = new FileReader()
      reader.onload = (e): void => {
        setProfileImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: OnboardingFormData): Promise<void> => {
    if (!isValid) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      if (data.middleName) {
        formData.append('middleName', data.middleName)
      }
      if (profileImageFile) {
        formData.append('profileImage', profileImageFile)
      }

      const response = await fetch('/api/auth/complete-profile', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      // Redirect to callback URL or guest overview
      const callbackUrl = searchParams.get('callbackUrl')
      const redirectUrl =
        callbackUrl || getRoutePathByRouteName('guestOverview')
      router.push(redirectUrl)
    } catch (error) {
      console.error('Profile update error:', error)
      setError(error instanceof Error ? error.message : 'UNEXPECTED_ERROR')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      display="flex"
      flex-direction="col"
      gap={2}
      border={1}
      border-color="quarternary"
      border-radius="xl"
    >
      <Box
        tag="header"
        display="flex"
        flex-direction="row"
        align-items="center"
        justify-content="center"
        padding-y={5}
        border-b={1}
        border-color="secondary-disabled"
      >
        <Heading tag="h1" like="h3-base" color="primary" font-weight="bold">
          {tOnboarding('heading')}
        </Heading>
      </Box>

      <Box display="flex" flex-direction="col" gap={6} padding={8}>
        <Heading tag="h2" like="h5" color="primary" font-weight="semibold">
          {tOnboarding('title')}
        </Heading>

        <Body size="base-md" text-color="secondary">
          {tOnboarding('description')}
        </Body>

        {error && <FormNotification variant="danger" description={error} />}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FlexBox flex-direction="col" gap={4}>
            {/* Profile Image Upload */}
            <FlexBox flex-direction="col" gap={3} align-items="center">
              <Body size="base-md" text-color="primary" font-weight="semibold">
                {tOnboarding('profileImage.label')}
              </Body>

              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <Body size="base-sm" text-color="tertiary" text-align="center">
                {tOnboarding('profileImage.description')}
              </Body>
            </FlexBox>

            {/* Name Fields */}
            <FlexBox flex-direction="col" gap={3}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    label={tCommon('forms.firstName.label')}
                    placeholder={tCommon('forms.firstName.placeholder')}
                    disabled={isLoading}
                    error={errors.firstName?.message}
                  />
                )}
              />

              <Controller
                name="middleName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="middleName"
                    label={tCommon('forms.middleName.label')}
                    placeholder={tCommon('forms.middleName.placeholder')}
                    disabled={isLoading}
                    error={errors.middleName?.message}
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    label={tCommon('forms.lastName.label')}
                    placeholder={tCommon('forms.lastName.placeholder')}
                    disabled={isLoading}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </FlexBox>

            <Button
              variant="secondary"
              size="xl"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? tOnboarding('submitting') : tOnboarding('submit')}
            </Button>
          </FlexBox>
        </form>
      </Box>
    </Box>
  )
}
