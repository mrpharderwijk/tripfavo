import { UserRole } from '@prisma/client'

import { SafeUser } from '@/types'

export type SafeUserDb = {
  name: {
    firstName: string
    middleName: string | null
    lastName: string
  } | null
  id: string
  email: string | null
  emailVerified: Date | null
  role: UserRole[]
  createdAt: Date
  updatedAt: Date
  status: {
    blocked: boolean
    blockedAt: Date | null
  } | null
  profileImage: {
    url: string | null
  } | null
}

export const safeUserSelect = {
  id: true,
  email: true,
  emailVerified: true,
  role: true,
  name: {
    select: {
      firstName: true,
      lastName: true,
      middleName: true,
    },
  },
  status: {
    select: {
      blocked: true,
      blockedAt: true,
    },
  },
  createdAt: true,
  updatedAt: true,
  profileImage: {
    select: {
      url: true,
    },
  },
}

export function mapSafeUserDbToSafeUser(user: SafeUserDb): SafeUser {
  const {
    id,
    name,
    email,
    emailVerified,
    createdAt,
    updatedAt,
    status,
    profileImage,
    role,
  } = user

  return {
    id,
    name: name ?? null,
    email,
    emailVerified: emailVerified?.toISOString() ?? null,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    role,
    status: {
      blocked: !!status?.blocked,
      blockedAt: status?.blockedAt?.toISOString() ?? null,
    },
    profileImage,
  }
}
