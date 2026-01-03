import { UserRole } from '@prisma/client'

export type SafeUser = {
  id: string
  name: {
    firstName: string
    middleName: string | null
    lastName: string
  } | null
  email: string | null
  emailVerified: string | null
  createdAt: string
  updatedAt: string
  role: UserRole[]
  status: {
    blocked: boolean
    blockedAt: string | null
  }
  profileImage: {
    url: string | null
  } | null
}
