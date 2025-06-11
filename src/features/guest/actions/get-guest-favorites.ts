import { getSession } from "@/actions/get-current-user"
import { GuestFavorite } from "@/features/guest/types/guest-favorite"
import { prisma } from "@/lib/prisma/db"

export async function getGuestFavorites(): Promise<GuestFavorite[] | null> {
  const session = await getSession()
  if (!session?.user?.id) {
    return null
  }
  
  try {
    const favorites = await prisma.guestFavorite.findMany({
      where: {
        userId: session.user.id,
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
          }
        },
        createdAt: true,
      },
    })

    return favorites
  } catch (error) {
    console.error(error)
    return null
  }
}