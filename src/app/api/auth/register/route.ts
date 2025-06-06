import { NextResponse } from 'next/server'

import { hashPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/prisma/db'

export async function POST(request: Request) {
  try {
    const { email, firstName, middleName, lastName, password, passwordConfirm } =
      await request.json()
    if (password !== passwordConfirm) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
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

    return NextResponse.json(user)
  } catch (error) {
    console.error('Registration error:', error)

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
