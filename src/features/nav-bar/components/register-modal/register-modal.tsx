import { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/input/input'
import { Body } from '@/components/atoms/typography/body/body'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useRegisterForm } from '@/features/nav-bar/components/register-modal/use-register-form'
import { useRegisterModal } from '@/features/nav-bar/components/register-modal/use-register-modal'

export function RegisterModal(): ReactElement {
  const { isVisible, closeDialog, openDialog } = useRegisterModal()
  const { handleSubmit, onSubmit, isLoading, control, errors, error } = useRegisterForm()

  return (
    <ModalDialog
      modalHeader={
        <Text tag="h3" font-weight="bold">
          Sign up
        </Text>
      }
      isVisible={isVisible}
      onClose={closeDialog}
    >
      <div className="flex flex-col gap-2 pb-6">
        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <Input
                id="email"
                label="Email"
                placeholder="Email address"
                disabled={isLoading}
                error={errors.email?.message?.toString()}
                {...field}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <Input
                id="name"
                label="Name"
                placeholder="Name"
                disabled={isLoading}
                error={errors.name?.message?.toString()}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input
                id="password"
                label="Password"
                placeholder="Password"
                disabled={isLoading}
                error={errors.password?.message?.toString()}
                {...field}
              />
            )}
          />

          <Controller
            name="passwordConfirm"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input
                id="passwordConfirm"
                label="Confirm Password"
                placeholder="Confirm Password"
                disabled={isLoading}
                error={errors.passwordConfirm?.message?.toString()}
                {...field}
              />
            )}
          />

          <Button variant="primary" size="xl" type="submit" disabled={isLoading} fullWidth>
            Submit
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2">
          <Body size="xs" color="gray">
            Already have an account?
          </Body>
          <div onClick={() => openDialog('login')} className="cursor-pointer hover:underline">
            <Body size="xs" color="gray">
              Log in
            </Body>
          </div>
        </div>
      </div>
    </ModalDialog>
  )
}
