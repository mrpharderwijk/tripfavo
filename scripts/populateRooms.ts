import { PrismaClient, RoomType } from '@prisma/client'

import { roomTypes } from '@/constants/room-types'

const prisma = new PrismaClient()

const roomData: { type: RoomType }[] = roomTypes.map((roomType) => ({
  type: roomType.value as RoomType,
}))

async function populateRooms(): Promise<void> {
  try {
    console.log('Starting to populate rooms...')

    for (const room of roomData) {
      await prisma.room.create({
        data: {
          type: room.type,
        },
      })
      console.log(`Created room: ${room.type}`)
    }

    console.log('Successfully populated all rooms!')
  } catch (error) {
    console.error('Error populating rooms:', error)
  } finally {
    await prisma.$disconnect()
  }
}

populateRooms()
