import { PrismaClient, RoomType } from '@prisma/client'

import { roomTypes } from '@/constants/room-types'

const prisma = new PrismaClient()

const roomData = roomTypes.map((roomType) => ({
  name: roomType.label,
  value: roomType.value,
}))

async function populateRooms(): Promise<void> {
  try {
    console.log('Starting to populate rooms...')

    for (const room of roomData) {
      await prisma.room.create({
        data: {
          name: room.name,
          value: room.value as RoomType,
          locale: 'en', // Default locale
        },
      })
      console.log(`Created room: ${room.name}`)
    }

    console.log('Successfully populated all rooms!')
  } catch (error) {
    console.error('Error populating rooms:', error)
  } finally {
    await prisma.$disconnect()
  }
}

populateRooms()
