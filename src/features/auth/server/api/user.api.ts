import { NextResponse } from 'next/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export async function POST(
  request: Request,
): Promise<NextResponse<string | { error: string }>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { firstName, middleName, lastName } = await request.json()
  if (!firstName || !lastName) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
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

    return NextResponse.json(user.id)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
