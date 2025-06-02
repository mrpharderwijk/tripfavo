import { NextResponse } from 'next/server'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { firstName, middleName, lastName } = await request.json()
  if (!firstName || !lastName) {
    return NextResponse.json({ error: 'First name and last name are required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: {
          update: {
            firstName,
            middleName,
            lastName,
          },
        },
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
