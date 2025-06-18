import { NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { resendVerifyToken } from '@/features/auth/verify-otp/server/actions/resend-verify-token.action'
import { handleError } from '@/server/utils/error-handling'

/**
 * Resend the verify token to the user's email
 * @param request - The request object
 * @returns The response object
 *
 * TODO: is it ok to use a server action in an api route?
 */
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 400 })
  }

  try {
    const result = await resendVerifyToken({
      userId: session?.user?.id,
    })

    if (typeof result === 'string') {
      return NextResponse.json({ error: result }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error: unknown) {
    const errorMessage = handleError(error)

    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
