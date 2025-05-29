import {
  AlertTriangle,
  ArrowBigUpDash,
  Baby,
  Bath,
  Bell,
  Car,
  CircleDot,
  Coffee,
  Dog,
  Dumbbell,
  Fan,
  Flame,
  Flower2,
  Gamepad2,
  HeartPulse,
  Home,
  Laptop2,
  Mountain,
  Shield,
  Ship,
  Tv,
  Umbrella,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { AmenityType } from '@prisma/client'

export const amenities: { label: string; value: AmenityType; icon: LucideIcon }[] = [
  {
    label: 'WiFi',
    value: AmenityType.WIFI,
    icon: Wifi,
  },
  {
    label: 'Swimming Pool',
    value: AmenityType.SWIMMING_POOL,
    icon: Waves,
  },
  {
    label: 'Hot Tub',
    value: AmenityType.HOT_TUB,
    icon: Bath,
  },
  {
    label: 'Tennis Court',
    value: AmenityType.TENNIS_COURT,
    icon: CircleDot,
  },
  {
    label: 'Gym',
    value: AmenityType.GYM,
    icon: Dumbbell,
  },
  {
    label: 'Air Conditioning',
    value: AmenityType.AIR_CONDITIONING,
    icon: Fan,
  },
  {
    label: 'Heating',
    value: AmenityType.HEATING,
    icon: Flame,
  },
  {
    label: 'Kitchen',
    value: AmenityType.KITCHEN,
    icon: UtensilsCrossed,
  },
  {
    label: 'Washer',
    value: AmenityType.WASHER,
    icon: WashingMachine,
  },
  {
    label: 'Dryer',
    value: AmenityType.DRYER,
    icon: Wind,
  },
  {
    label: 'TV',
    value: AmenityType.TV,
    icon: Tv,
  },
  {
    label: 'Free Parking',
    value: AmenityType.FREE_PARKING,
    icon: Car,
  },
  {
    label: 'Sea View',
    value: AmenityType.SEA_VIEW,
    icon: Ship,
  },
  {
    label: 'Mountain View',
    value: AmenityType.MOUNTAIN_VIEW,
    icon: Mountain,
  },
  {
    label: 'Garden',
    value: AmenityType.GARDEN,
    icon: Flower2,
  },
  {
    label: 'BBQ Grill',
    value: AmenityType.BBQ_GRILL,
    icon: Flame,
  },
  {
    label: 'Playground',
    value: AmenityType.PLAYGROUND,
    icon: Gamepad2,
  },
  {
    label: 'Beach Access',
    value: AmenityType.BEACH_ACCESS,
    icon: Umbrella,
  },
  {
    label: 'Fireplace',
    value: AmenityType.FIREPLACE,
    icon: Flame,
  },
  {
    label: 'Workspace',
    value: AmenityType.WORKSPACE,
    icon: Laptop2,
  },
  {
    label: 'Pet Friendly',
    value: AmenityType.PET_FRIENDLY,
    icon: Dog,
  },
  {
    label: 'Security System',
    value: AmenityType.SECURITY_SYSTEM,
    icon: Shield,
  },
  {
    label: 'First Aid Kit',
    value: AmenityType.FIRST_AID_KIT,
    icon: HeartPulse,
  },
  {
    label: 'Fire Extinguisher',
    value: AmenityType.FIRE_EXTINGUISHER,
    icon: AlertTriangle,
  },
  {
    label: 'Smoke Alarm',
    value: AmenityType.SMOKE_ALARM,
    icon: Bell,
  },
  {
    label: 'Elevator',
    value: AmenityType.ELEVATOR,
    icon: ArrowBigUpDash,
  },
  {
    label: 'Balcony',
    value: AmenityType.BALCONY,
    icon: Home,
  },
  {
    label: 'Breakfast Included',
    value: AmenityType.BREAKFAST_INCLUDED,
    icon: Coffee,
  },
  {
    label: 'Dishwasher',
    value: AmenityType.DISHWASHER,
    icon: UtensilsCrossed,
  },
  {
    label: 'Baby Equipment',
    value: AmenityType.BABY_EQUIPMENT,
    icon: Baby,
  },
]
