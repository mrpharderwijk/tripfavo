import { NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

import { prisma } from '@/lib/prisma/db'
import { isUserValid } from '@/server/utils/is-valid-user'

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
): Promise<NextResponse<string | { error: string }>> {
  const { userId } = await params
  if (!userId) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const isValidUser = await isUserValid(userId)
  if (!isValidUser) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { image } = await request.json()
  if (!image) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    // Delete old profile image
    const userProfileImage = await prisma.userProfileImage.findUnique({
      where: {
        userId,
      },
    })
    const utapi = new UTApi()
    await utapi.deleteFiles([userProfileImage?.fileKey ?? ''])

    // Update profile image
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        profileImage: {
          upsert: {
            create: {
              url: image.url,
              fileHash: image.fileHash,
              fileKey: image.fileKey,
              fileName: image.fileName,
              fileType: image.fileType,
              size: image.size,
            },
            update: {
              url: image.url,
              fileHash: image.fileHash,
              fileKey: image.fileKey,
              fileName: image.fileName,
              fileType: image.fileType,
              size: image.size,
            },
          },
        },
      },
      select: {
        profileImage: true,
      },
    })

    return NextResponse.json(user?.profileImage?.url ?? '')
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    )
  }
}
