import { EmailVerifyOtp } from '@/features/auth/verify-otp/components/email-verify-otp/email-verify-otp'
import { prisma } from '@/lib/prisma/db'
import { resend } from '@/lib/resend/resend'
import { ServerActionResponse } from '@/server/utils/error'
import { generateToken } from '@/server/utils/generate-token'

export type ResendTokenPayload = { userId: string }
export type ResendTokenReply = { success: boolean }

export async function resendVerifyToken({
  userId,
}: ResendTokenPayload): Promise<ServerActionResponse<boolean | null>> {
  if (!userId) {
    return { error: 'BAD_REQUEST' }
  }

  try {
    /**
     * Generate and create the confirm token and set its expiration time
     */
    const token = generateToken(6)
    const tokenExpiration = Date.now() + 3600000 // Token expires in 1 hour
    const createToken = await prisma.userVerifyToken.upsert({
      where: {
        userId,
      },
      create: {
        token,
        expires: new Date(tokenExpiration),
        userId,
      },
      update: {
        token,
        expires: new Date(tokenExpiration),
      },
    })

    if (!createToken) {
      return { error: 'INTERNAL_SERVER_ERROR' }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    })
    if (!user) {
      return { error: 'INTERNAL_SERVER_ERROR' }
    }

    const { data, error } = await resend.emails.send({
      from: 'TripFavo <noreply@rocketsciencebv.nl>',
      to: [
        `${process.env.NEXT_PUBLIC_ENV === 'LOCAL' ? process.env.NEXT_PUBLIC_LOCAL_HOST_EMAIL : user?.email}`,
      ],
      subject: `Verify your email`,
      react: EmailVerifyOtp({
        token,
      }),
    })

    return { data: true }
  } catch (error: unknown) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
