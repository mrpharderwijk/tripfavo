import { getSession } from '@/features/auth/server/actions/get-current-user'
import { GuestFavorite } from '@/features/guest/favorites/types/guest-favorite'
import { prisma } from '@/lib/prisma/db'
import { ServerActionResponse } from '@/server/utils/error'

export async function getGuestFavorites(): Promise<
  ServerActionResponse<GuestFavorite[] | null>
> {
  const session = await getSession()
  if (!session?.user?.id) {
    return { error: 'UNAUTHORIZED' }
  }

  try {
    const favorites = await prisma.guestFavorite.findMany({
      where: {
        guestId: session.user.id,
      },
      select: {
        id: true,
        listing: {
          select: {
            id: true,
            title: true,
            images: {
              where: {
                isMain: true,
              },
              select: {
                url: true,
                fileName: true,
                isMain: true,
              },
            },
            location: {
              select: {
                city: true,
                country: true,
              },
            },
          },
        },
        createdAt: true,
      },
    })

    return { data: favorites }
  } catch (error: unknown) {
    return { error: 'INTERNAL_SERVER_ERROR' }
  }
}
