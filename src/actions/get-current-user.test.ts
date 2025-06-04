import { Session } from 'next-auth'
import { vi } from 'vitest'
import { UserRole } from '@prisma/client'

import { getCurrentUser, getSession } from './get-current-user'

import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma/db'

const userMock = {
  id: '1',
  profileImage: {
    url: 'http://example.com/image.jpg',
  },
  hashedPassword: 'hashedpass',
  favoriteIds: ['1', '2'],
  name: {
    firstName: 'John',
    lastName: 'Doe',
    middleName: null,
  },
  email: 'test@example.com',
  emailVerified: new Date('2023-01-01'),
  role: [UserRole.GUEST],
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
}

const sessionMock: Session = {
  user: {
    email: 'test@example.com',
  },
  expires: new Date().toISOString(),
}

vi.mock('@/lib/auth/auth')
const authMock = vi.mocked(auth).mockResolvedValue(sessionMock)

vi.mock('@/lib/prisma/db')
const prismaMock = vi.mocked(prisma.user.findUnique).mockResolvedValue(userMock)

describe('getCurrentUser', () => {
  beforeEach(vi.clearAllMocks)

  it('should return null if no session exists', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as unknown as Session)
    const result = await getCurrentUser()
    expect(result).toBeNull()
  })

  it('should return null if no user email in session', async () => {
    const result = await getCurrentUser()
    expect(result).toBeNull()
  })

  it('should return null if user not found in database', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null)
    const result = await getCurrentUser()
    expect(result).toBeNull()
  })

  it('should return formatted user data if user exists', async () => {
    const result = await getCurrentUser()

    expect(result).toEqual({
      ...userMock,
      createdAt: userMock.createdAt.toISOString(),
      updatedAt: userMock.updatedAt.toISOString(),
      emailVerified: userMock.emailVerified.toISOString(),
      role: userMock.role,
    })
  })

  it('should handle database errors gracefully', async () => {
    vi.mocked(prisma.user.findUnique).mockRejectedValueOnce(new Error('DB Error'))
    const result = await getCurrentUser()
    expect(result).toBeNull()
  })
})

describe('getSession', () => {
  it('should return auth session', async () => {
    const result = await getSession()
    expect(result).toEqual(sessionMock)
    expect(auth).toHaveBeenCalled()
  })
})
