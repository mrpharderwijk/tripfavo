'use client'

import { useLocale, useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { FormNotification } from '@/components/molecules/form-notification/form-notification'
import { FormItem } from '@/components/ui/form'
import { FormControl, FormMessage } from '@/components/ui/form'
import { Form, FormField } from '@/components/ui/form'
import { InputOTPSeparator } from '@/components/ui/input-otp'
import { InputOTPSlot } from '@/components/ui/input-otp'
import { InputOTPGroup } from '@/components/ui/input-otp'
import { InputOTP } from '@/components/ui/input-otp'
import { isTokenExpired } from '@/features/auth/utils/is-token-expired'
import { VerifyOtpCountDown } from '@/features/auth/verify-otp/verify-otp/components/verify-otp-count-down/verify-otp-count-down'
import { useVerifyOtpForm } from '@/features/auth/verify-otp/verify-otp/components/verify-otp-form/use-verify-otp-form'

type VerifyFormProps = {
  token?: string
  expires?: Date | null
}

/**
 * TODO: Translations
 */
export function VerifyOtpForm({
  token,
  expires,
}: VerifyFormProps): ReactElement {
  const locale = useLocale()
  const {
    error,
    form,
    onSubmit,
    onClickResendHandler,
    isLoadingSubmit,
    isLoadingResend,
  } = useVerifyOtpForm({ token })
  const isExpired = isTokenExpired(expires)
  const tVerifyOtp = useTranslations('auth.verifyOtp')

  return (
    <>
      {!!error && (
        <FormNotification variant="danger" description={error.message} />
      )}

      {isExpired && (
        <FormNotification
          variant="danger"
          title={tVerifyOtp('expired.heading')}
          description={tVerifyOtp('expired.description')}
        />
      )}

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FlexBox flex-direction="col" gap={4}>
            <FlexBox flex-direction="col" gap={3}>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-6">
                    <FormControl className="flex flex-row items-center align-center">
                      <InputOTP
                        containerClassName="mx-auto"
                        maxLength={6}
                        {...field}
                        disabled={
                          isExpired || isLoadingSubmit || isLoadingResend
                        }
                      >
                        <InputOTPGroup className="w-full items-center justify-center">
                          <InputOTPSlot
                            className="w-8 h-10 md:w-10 md:h-14"
                            index={0}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup className="w-full items-center justify-center">
                          <InputOTPSlot
                            className="w-8 h-10 md:w-10 md:h-14"
                            index={1}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup className="w-full items-center justify-center">
                          <InputOTPSlot
                            className="w-8 h-10 md:w-10 md:h-14"
                            index={2}
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator className="hidden sm:block" />
                        <InputOTPGroup className="w-full items-center justify-center">
                          <InputOTPSlot
                            className="w-8 h-10 md:w-10 md:h-14"
                            index={3}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup className="w-full items-center justify-center">
                          <InputOTPSlot
                            className="w-8 h-10 md:w-10 md:h-14"
                            index={4}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup className="w-full items-center justify-center">
                          <InputOTPSlot
                            className="w-8 h-10 md:w-10 md:h-14"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Box
                display="flex"
                flex-direction="col"
                align-items="center"
                gap={2}
              >
                {!isExpired && !!expires && (
                  <VerifyOtpCountDown expires={expires} />
                )}
              </Box>

              <FlexBox
                flex-direction="row"
                align-items="center"
                justify-content="end"
                gap={4}
              >
                <Button
                  onClick={onClickResendHandler}
                  variant="primary"
                  loading={isLoadingResend}
                  disabled={isLoadingSubmit || isLoadingResend}
                >
                  {tVerifyOtp('button.resend')}
                </Button>

                <Button
                  variant="primary-inverse"
                  loading={isLoadingSubmit}
                  disabled={isExpired || isLoadingSubmit || isLoadingResend}
                  type="submit"
                >
                  {tVerifyOtp('button.submit')}
                </Button>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </form>
      </Form>
    </>
  )
}
