import { NextResponse } from 'next/server'
import { PropertyStatus } from '@prisma/client'

import { prisma } from '@/lib/prisma/db'

export async function GET(): Promise<NextResponse> {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: PropertyStatus.PUBLISHED,
      },
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
