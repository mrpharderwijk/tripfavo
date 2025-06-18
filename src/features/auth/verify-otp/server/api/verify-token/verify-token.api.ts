import { NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { isTokenExpired } from '@/features/auth/utils/is-token-expired'
import { prisma } from '@/lib/prisma/db'

export async function POST(request: Request): Promise<Response> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  // Get the otp from the request body
  const body = await request.json()
  const { otp } = body
  if (!otp) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    // Find the token by userId and given token
    const verifyToken = await prisma.userVerifyToken.findUnique({
      where: {
        token: otp,
        userId: session.user.id,
      },
    })
    if (!verifyToken) {
      return NextResponse.json(
        { message: 'ERROR_OTP_INVALID' },
        { status: 400 },
      )
    }

    // Check if the token is expired
    const isExpired = isTokenExpired(verifyToken.expires)
    if (isExpired) {
      return NextResponse.json(
        { message: 'TOKEN_OTP_EXPIRED' },
        { status: 400 },
      )
    }

    // Update the user status
    const updateUserStatus = await prisma.userStatus.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        verified: true,
        verifiedAt: new Date(),
        blocked: false,
        blockedAt: null,
        userId: session.user.id,
      },
      update: {
        verified: true,
        verifiedAt: new Date(),
        blocked: false,
        blockedAt: null,
        userId: session.user.id,
      },
    })
    if (!updateUserStatus) {
      return NextResponse.json(
        { message: 'INTERNAL_SERVER_ERROR' },
        { status: 500 },
      )
    }

    // Delete the token
    const deleteToken = await prisma.userVerifyToken.delete({
      where: {
        userId: session.user.id,
      },
    })
    if (!deleteToken) {
      return NextResponse.json(
        { message: 'INTERNAL_SERVER_ERROR' },
        { status: 400 },
      )
    }

    return NextResponse.json({ message: 'OTP_VERIFIED' }, { status: 200 })
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
