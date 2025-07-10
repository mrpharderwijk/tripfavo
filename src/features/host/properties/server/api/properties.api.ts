import { NextRequest, NextResponse } from 'next/server'
import { Property, PropertyStatus } from '@prisma/client'

import { HostPropertyParams } from '@/features/host/properties/types/host-property-params'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function POST(
  request: NextRequest,
  { params }: HostPropertyParams,
): Promise<NextResponse<Property | { error: string }>> {
  const { userId } = await params
  if (!userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const property = await prisma.property.create({
      data: {
        hostId: userId,
        title: '',
        description: '',
        neighbourhoodDescription: '',
        status: PropertyStatus.DRAFT,
      },
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: HostPropertyParams,
): Promise<NextResponse<Property[] | { error: string }>> {
  const { propertyId, userId } = await params
  if (!propertyId || !userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        hostId: userId,
      },
    })

    return NextResponse.json(properties)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
