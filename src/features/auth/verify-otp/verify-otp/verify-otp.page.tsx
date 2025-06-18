import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { CardDialog } from '@/components/organisms/card-dialog/card-dialog'
import { VerifyOtpForm } from '@/features/auth/verify-otp/verify-otp/components/verify-otp-form/verify-otp-form'

type VerifyOtpPageProps = {
  token?: string
  expires?: Date | null
  callbackUrl?: string
}

export async function VerifyOtpPage({
  token,
  expires,
  callbackUrl,
}: VerifyOtpPageProps): Promise<ReactElement> {
  const tAuthVerifyOtp = await getTranslations('auth.verifyOtp')

  return (
    <CardDialog
      heading={tAuthVerifyOtp('heading')}
      title={tAuthVerifyOtp('title')}
      description={tAuthVerifyOtp('description')}
    >
      <VerifyOtpForm token={token} expires={expires} />
    </CardDialog>
  )
}
