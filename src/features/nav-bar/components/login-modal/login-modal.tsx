import { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/atoms/input/input'
import { Body } from '@/components/atoms/typography/body/body'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useLoginForm } from '@/features/auth/login/use-login-form'
import { useLoginModal } from '@/features/nav-bar/components/login-modal/use-login-modal'

export function LoginModal(): ReactElement {
  const { isVisible, openDialog, closeDialog } = useLoginModal()
  const { handleSubmit, onSubmit, isLoading, control, errors, error } = useLoginForm()

  return (
    <ModalDialog
      modalHeader={
        <Text tag="h3" font-weight="bold">
          Login
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

          <Button variant="primary" size="lg" type="submit" disabled={isLoading} fullWidth>
            Submit
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2">
          <Body size="base-xs" color="gray">
            Don&apos;t have an account?
          </Body>
          <div onClick={() => openDialog('register')} className="cursor-pointer hover:underline">
            <Body size="base-xs" color="gray">
              Register
            </Body>
          </div>
        </div>
      </div>
    </ModalDialog>
  )
}
