import { NextResponse } from 'next/server'
import { Reservation } from '@prisma/client'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export async function GET(): Promise<
  NextResponse<Reservation[] | { error: string }>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json(reservations)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
