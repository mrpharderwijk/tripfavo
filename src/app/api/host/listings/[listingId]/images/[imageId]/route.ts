import { NextRequest, NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

type ImageParams = {
  params: Promise<{
    listingId: string
    imageId: string
  }>
}

export async function PATCH(request: NextRequest, { params }: ImageParams) {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { listingId, imageId } = await params

  if (!listingId || !imageId) {
    return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
  }

  const { roomType, isMain } = await request.json()

  if (!roomType && !isMain) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 })
  }

  try {
    if (roomType) {
      // First ensure the Room exists
      const room = await prisma.room.upsert({
        where: {
          type: roomType,
        },
        create: {
          type: roomType,
        },
        update: {},
      })

      const listingImage = await prisma.listingImage.update({
        where: {
          id: imageId,
        },
        data: {
          roomType: roomType,
          roomId: room.id,
        },
        include: {
          Room: true,
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
          id: imageId,
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

  const { listingId, imageId } = await params

  if (!listingId || !imageId) {
    return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
  }

  try {
    const utapi = new UTApi()
    const listingImage = await prisma.listingImage.findUnique({
      where: {
        id: imageId,
      },
    })

    await prisma.listingImage.delete({
      where: {
        id: imageId,
        listingId,
      },
    })
    console.log('listingImage: ', listingImage)
    if (listingImage?.fileKey) {
      await utapi.deleteFiles([listingImage?.fileKey])
    }

    return NextResponse.json({ message: 'Image deleted' })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ message: 'Error deleting image' }, { status: 500 })
  }
}
