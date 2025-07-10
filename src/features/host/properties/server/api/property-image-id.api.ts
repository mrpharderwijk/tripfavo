import { NextRequest, NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

type ImageParams = {
  params: Promise<{
    propertyId: string
    userId: string
    imageId: string
  }>
}

export async function PATCH(
  request: NextRequest,
  { params }: ImageParams,
): Promise<NextResponse> {
  const { propertyId, userId, imageId } = await params
  if (!propertyId || !userId || !imageId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { roomType, isMain } = await request.json()

  if (!roomType && !isMain) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    if (roomType) {
      const propertyImage = await prisma.propertyImage.update({
        where: {
          id: imageId,
        },
        data: {
          roomType: roomType,
        },
      })

      return NextResponse.json(propertyImage, { status: 200 })
    }

    // Connect the image to the room
    if (isMain) {
      await prisma.propertyImage.updateMany({
        where: {
          propertyId,
          isMain: true,
        },
        data: {
          isMain: false,
        },
      })

      const propertyImage = await prisma.propertyImage.update({
        where: {
          id: imageId,
          propertyId,
        },
        data: {
          isMain: true,
        },
      })
      return NextResponse.json(propertyImage, { status: 200 })
    }

    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ImageParams,
): Promise<NextResponse> {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { propertyId, imageId } = await params

  if (!propertyId || !imageId) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const utapi = new UTApi()
    const propertyImage = await prisma.propertyImage.findUnique({
      where: {
        id: imageId,
      },
    })

    await prisma.propertyImage.delete({
      where: {
        id: imageId,
        propertyId,
      },
    })

    if (propertyImage?.fileKey) {
      await utapi.deleteFiles([propertyImage?.fileKey])
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
