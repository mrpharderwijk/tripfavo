import { NextResponse } from 'next/server'

import { hashPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/prisma/db'

export async function POST(
  request: Request,
): Promise<NextResponse<string | { error: string }>> {
  try {
    const {
      email,
      firstName,
      middleName,
      lastName,
      password,
      passwordConfirm,
    } = await request.json()
    if (password !== passwordConfirm) {
      return NextResponse.json(
        { error: 'PASSWORDS_DO_NOT_MATCH' },
        { status: 400 },
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    console.log('----> existingUser: ', existingUser)
    if (existingUser) {
      return NextResponse.json(
        { error: 'EMAIL_ALREADY_EXISTS' },
        { status: 400 },
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name: {
          create: {
            firstName,
            middleName,
            lastName,
          },
        },
        hashedPassword,
      },
    })

    console.log('----> user: ', user)

    return NextResponse.json(user.id)
  } catch (error) {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
