import { NextRequest, NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

type ImageParams = {
  params: Promise<{
    listingId: string
    fileKey: string
  }>
}

export async function PATCH(request: NextRequest, { params }: ImageParams) {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId, fileKey } = await params

  if (!listingId || !fileKey) {
    return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
  }

  const { roomValue, isMain } = await request.json()

  if (!roomValue && !isMain) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 })
  }

  try {
    if (roomValue) {
      // First try to find an existing room
      const existingRoom = await prisma.listingRoom.findFirst({
        where: {
          listingId,
          roomValue: roomValue,
        },
      })

      // Update existing room
      const listingRoom = existingRoom
        ? await prisma.listingRoom.update({
            where: {
              id: existingRoom.id,
            },
            data: {
              roomValue: roomValue,
            },
          })
        : // Create new room
          await prisma.listingRoom.create({
            data: {
              listingId,
              roomValue: roomValue,
            },
          })

      const listingImage = await prisma.listingImage.update({
        where: {
          fileKey,
          listingId,
        },
        data: {
          listingRoomId: listingRoom.id,
        },
      })

      return NextResponse.json(listingImage, { status: 200 })
    }

    // Connect the image to the room
    if (isMain) {
      await prisma.listingImage.updateMany({
        where: {
          listingId,
          isMain: true,
        },
        data: {
          isMain: false,
        },
      })

      const listingImage = await prisma.listingImage.update({
        where: {
          fileKey,
          listingId,
        },
        data: {
          isMain: true,
        },
      })

      return NextResponse.json(listingImage, { status: 200 })
    }
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ message: 'Error updating image' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: ImageParams) {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId, fileKey } = await params

  if (!listingId || !fileKey) {
    return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
  }

  try {
    const utapi = new UTApi()

    await prisma.listingImage.delete({
      where: {
        fileKey,
        listingId,
      },
    })

    await utapi.deleteFiles([fileKey])

    return NextResponse.json({ message: 'Image deleted' })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ message: 'Error deleting image' }, { status: 500 })
  }
}
