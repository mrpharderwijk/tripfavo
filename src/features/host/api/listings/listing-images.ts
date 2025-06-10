import { NextRequest, NextResponse } from 'next/server'
import { UploadedFileData } from 'uploadthing/types'
import { ListingImage, RoomType } from '@prisma/client'

import { getSession } from '@/actions/get-current-user'
import { HostListingParams } from '@/features/host/types/host-listing-params'
import { prisma } from '@/lib/prisma/db'

export async function GET(request: NextRequest, { params }: HostListingParams) {
  const session = await getSession()
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 })
  }

  try {
    const images = await prisma.listingImage.findMany({
      where: {
        listingId,
        userId: session.user.id,
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
        userId: true,
        roomType: true,
        roomId: true,
      },
    })

    return NextResponse.json(images, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to get images' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: HostListingParams) {
  const session = await getSession()
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { listingId } = await params
  if (!listingId) {
    return NextResponse.json({ message: 'Listing ID is required' }, { status: 400 })
  }

  const { files } = await request.json()
  if (!files.length) {
    return NextResponse.json({ message: 'No files provided' }, { status: 400 })
  }

  try {
    const existingImages = await prisma.listingImage.findMany({
      where: {
        listingId,
      },
    })
    const hasMainImage = existingImages.some((file) => file.isMain)

    const images = await Promise.all(
      files.map(
        async (file: ListingImage & UploadedFileData & { roomValue?: RoomType }, index: number) => {
          const image = await prisma.listingImage.upsert({
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
              userId: session?.user?.id,
              listingId,
            },
            update: {
              fileKey: file.fileKey,
              fileName: file.fileName,
              fileType: file.fileType,
              size: file.size,
              url: file.url || '',
              isMain: !hasMainImage && index === 0 ? true : (file.isMain ?? false),
              listingId,
            },
          })

          return image
        },
      ),
    )

    return NextResponse.json(images, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to upload images' }, { status: 500 })
  }
}
