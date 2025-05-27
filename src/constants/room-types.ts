import {
  Bath,
  BedDouble,
  Briefcase,
  Building,
  Car,
  CornerDownRight,
  Dumbbell,
  Home,
  Layers,
  MoreHorizontal,
  Palette,
  Sofa,
  Sprout,
  Sun,
  ThermometerSun,
  TreePine,
  Umbrella,
  Utensils,
  UtensilsCrossed,
  Warehouse,
  Waves,
} from 'lucide-react'

export const roomTypes = [
  {
    label: 'Bedroom',
    value: 'BEDROOM',
    icon: BedDouble,
  },
  {
    label: 'Living room',
    value: 'LIVING_ROOM',
    icon: Sofa,
  },
  {
    label: 'Kitchen',
    value: 'KITCHEN',
    icon: Utensils,
  },
  {
    label: 'Bathroom',
    value: 'BATHROOM',
    icon: Bath,
  },
  {
    label: 'Office',
    value: 'OFFICE',
    icon: Briefcase,
  },
  {
    label: 'Dining room',
    value: 'DINING_ROOM',
    icon: UtensilsCrossed,
  },
  {
    label: 'Garage',
    value: 'GARAGE',
    icon: Car,
  },
  {
    label: 'Hallway',
    value: 'HALLWAY',
    icon: CornerDownRight,
  },
  {
    label: 'Front porch',
    value: 'FRONT_PORCH',
    icon: Home,
  },
  {
    label: 'Back porch',
    value: 'BACK_PORCH',
    icon: Home,
  },
  {
    label: 'Balcony',
    value: 'BALCONY',
    icon: Sun,
  },
  {
    label: 'Attic',
    value: 'ATTIC',
    icon: Building,
  },
  {
    label: 'Shed',
    value: 'SHED',
    icon: Warehouse,
  },
  {
    label: 'Front yard',
    value: 'FRONT_YARD',
    icon: TreePine,
  },
  {
    label: 'Back yard',
    value: 'BACK_YARD',
    icon: TreePine,
  },
  {
    label: 'Patio',
    value: 'PATIO',
    icon: Umbrella,
  },
  {
    label: 'Garden',
    value: 'GARDEN',
    icon: Sprout,
  },
  {
    label: 'Pool',
    value: 'POOL',
    icon: Waves,
  },
  {
    label: 'Hot tub',
    value: 'HOT_TUB',
    icon: Bath,
  },
  {
    label: 'Sauna',
    value: 'SAUNA',
    icon: ThermometerSun,
  },
  {
    label: 'Gym',
    value: 'GYM',
    icon: Dumbbell,
  },
  {
    label: 'Studio',
    value: 'STUDIO',
    icon: Palette,
  },
  {
    label: 'Studio loft',
    value: 'STUDIO_LOFT',
    icon: Layers,
  },
  {
    label: 'Other',
    value: 'OTHER',
    icon: MoreHorizontal,
  },
]
