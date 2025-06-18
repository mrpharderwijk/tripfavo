import { DoorClosed, House, HousePlus } from 'lucide-react'

export const privacyTypes = [
  {
    label: 'An entire property',
    value: 'property',
    icon: House,
    description: 'Guests have the whole property to themselves.',
  },
  {
    label: 'A private room in a shared property',
    value: 'room-shared-property',
    icon: DoorClosed,
    description:
      'Guests have their own room in a home, plus access to shared spaces.',
  },
  {
    label: 'A shared room in a shared property',
    value: 'shared-room-shared-property',
    icon: HousePlus,
    description:
      'Guests sleep in a shared room in a professional managed hostel with staff on-site 24/7.',
  },
]
