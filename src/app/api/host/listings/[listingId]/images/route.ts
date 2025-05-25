import { NextRequest, NextResponse } from 'next/server'
import { UploadedFileData } from 'uploadthing/types'

import { getSession } from '@/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

type ImagesParams = { params: Promise<{ listingId: string }> }

export async function POST(request: NextRequest, { params }: ImagesParams) {
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
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: session.user.id,
    //   },
    // })
    const listing = await prisma.listing.update({
      where: {
        userId: session?.user?.id,
        id: listingId,
      },
      data: {
        images: {
          upsert: files.map((file: UploadedFileData, index: number) => ({
            where: {
              fileHash: file.fileHash,
              userId: session?.user?.id,
            },
            create: {
              fileName: file.name,
              size: file.size,
              key: file.key,
              fileHash: file.fileHash,
              fileType: file.type,
              url: file.ufsUrl,
              isMain: index === 0 ? true : false,
            },
            update: {
              fileName: file.name,
              size: file.size,
              key: file.key,
              fileHash: file.fileHash,
              fileType: file.type,
              url: file.ufsUrl,
            },
          })),
        },
      },
    })
    return NextResponse.json({ message: 'Images uploaded successfully' })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to upload images' }, { status: 500 })
  }
}
