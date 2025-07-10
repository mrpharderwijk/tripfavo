import { NextResponse } from 'next/server'

import { hostPropertySelect } from '@/features/host/properties/server/actions/get-host-properties'
import { HostPropertyParams } from '@/features/host/properties/types/host-property-params'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function GET(
  request: Request,
  { params }: HostPropertyParams,
): Promise<NextResponse> {
  const { propertyId, userId } = await params
  if (!propertyId || !userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
        hostId: userId,
      },
      select: hostPropertySelect,
    })

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    return NextResponse.json(property, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: HostPropertyParams,
): Promise<NextResponse> {
  const { propertyId, userId } = await params
  if (!propertyId || !userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    await prisma.property.delete({
      where: { hostId: userId, id: propertyId },
    })

    return NextResponse.json(
      { message: 'Property deleted successfully' },
      { status: 200 },
    )
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
