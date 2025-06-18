import { NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

import { getSession } from '@/features/auth/server/actions/get-current-user'
import { prisma } from '@/lib/prisma/db'

export async function POST(
  request: Request,
): Promise<NextResponse<string | { error: string }>> {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { image } = await request.json()
  if (!image) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  try {
    const userProfileImage = await prisma.userProfileImage.findUnique({
      where: {
        userId: session.user.id,
      },
    })
    const utapi = new UTApi()
    await utapi.deleteFiles([userProfileImage?.fileKey ?? ''])

    const user = await prisma.user.update({
      where: { id: session.user.id },
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
