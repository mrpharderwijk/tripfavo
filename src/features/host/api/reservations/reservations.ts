import { NextResponse } from 'next/server'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'
import { Reservation } from '@prisma/client'

export async function GET(): Promise<NextResponse<Reservation[] | { error: string }>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json(reservations)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
