import { NextRequest, NextResponse } from 'next/server'
import { UploadedFileData } from 'uploadthing/types'
import { PropertyImage, RoomType } from '@prisma/client'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { HostPropertyParams } from '@/features/host/properties/types/host-property-params'
import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function GET(
  request: NextRequest,
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
    const images = await prisma.propertyImage.findMany({
      where: {
        propertyId,
        hostId: userId,
      },
      select: {
        id: true,
        fileKey: true,
        fileName: true,
        fileHash: true,
        fileType: true,
        isMain: true,
        size: true,
        url: true,
        createdAt: true,
        updatedAt: true,
        hostId: true,
        roomType: true,
      },
    })

    return NextResponse.json(images, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to get images' },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: HostPropertyParams,
): Promise<NextResponse> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { propertyId } = await params
  if (!propertyId) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  const { files } = await request.json()
  if (!files.length) {
    return NextResponse.json({ message: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const existingImages = await prisma.propertyImage.findMany({
      where: {
        propertyId,
      },
    })
    const hasMainImage = existingImages.some((file) => file.isMain)

    const images = await Promise.all(
      files.map(
        async (
          file: PropertyImage & UploadedFileData & { roomValue?: RoomType },
          index: number,
        ) => {
          const image = await prisma.propertyImage.upsert({
            where: {
              fileKey: file.fileKey,
            },
            create: {
              fileHash: file.fileHash,
              fileKey: file.fileKey,
              fileName: file.fileName,
              fileType: file.fileType,
              isMain: !hasMainImage && index === 0 ? true : false,
              size: file.size,
              url: file.url || '',
              hostId: session?.user?.id,
              propertyId,
            },
            update: {
              fileKey: file.fileKey,
              fileName: file.fileName,
              fileType: file.fileType,
              size: file.size,
              url: file.url || '',
              isMain:
                !hasMainImage && index === 0 ? true : (file.isMain ?? false),
              propertyId,
            },
          })

          return image
        },
      ),
    )

    return NextResponse.json(images, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { message: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
