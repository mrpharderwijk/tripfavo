import { AmenityType, PrismaClient } from '@prisma/client'

import { amenities } from '@/constants/amenities'

const prisma = new PrismaClient()

const amenityData: { value: AmenityType }[] = amenities.map((amenity) => ({
  value: amenity.value,
}))

async function populateAmenities(): Promise<void> {
  try {
    console.log('Starting to populate amenities...')

    for (const amenity of amenityData) {
      await prisma.amenity.create({
        data: {
          type: amenity.value,
        },
      })
      console.log(`Created amenity: ${amenity.value}`)
    }

    console.log('Successfully populated all amenities!')
  } catch (error) {
    console.error('Error populating amenities:', error)
  } finally {
    await prisma.$disconnect()
  }
}

populateAmenities()
