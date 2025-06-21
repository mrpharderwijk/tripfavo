import { ReactElement } from 'react'

import { EmailVerifyOtp } from '@/features/auth/verify-otp/components/email-verify-otp/email-verify-otp'
import { defaultLocale } from '@/i18n/config'

export default function VerifyOtp(): ReactElement {
  const token = '123456'
  const locale = defaultLocale

  return <EmailVerifyOtp token={token} locale={locale} />
}
