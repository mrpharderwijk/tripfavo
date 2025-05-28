import { AmenityType, PrismaClient } from '@prisma/client'

import { amenities } from '@/constants/amenities'

const prisma = new PrismaClient()

const amenityData = amenities.map((amenity) => ({
  name: amenity.label,
  value: amenity.value.toUpperCase().replace(/-/g, '_') as AmenityType,
}))

async function populateAmenities(): Promise<void> {
  try {
    console.log('Starting to populate amenities...')

    for (const amenity of amenityData) {
      await prisma.amenity.create({
        data: {
          name: amenity.name,
          value: amenity.value,
        },
      })
      console.log(`Created amenity: ${amenity.name}`)
    }

    console.log('Successfully populated all amenities!')
  } catch (error) {
    console.error('Error populating amenities:', error)
  } finally {
    await prisma.$disconnect()
  }
}

populateAmenities()
