import { NextResponse } from 'next/server'

import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/prisma/db'

export async function POST(
  request: Request,
): Promise<NextResponse<string | { error: string }>> {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'INVALID_CREDENTIALS' },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { error: 'INVALID_CREDENTIALS' },
        { status: 400 },
      )
    }

    const isPasswordValid = await verifyPassword(password, user.hashedPassword)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'INVALID_CREDENTIALS' },
        { status: 400 },
      )
    }

    return NextResponse.json(user.id)
  } catch (error) {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
