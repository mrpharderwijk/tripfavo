import { Prisma } from '@prisma/client'

export function handleError(error: unknown): string {
  if (isPrismaError(error)) {
    return handlePrismaError(error)
  }

  if (error instanceof Error) {
    return error.message ?? 'GENERAL_ERROR'
  }

  // Fallback for unknown error types
  return 'UNEXPECTED_ERROR'
}

function isPrismaError(error: unknown): boolean {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return true
  }

  return false
}

// Helper function to handle Prisma errors and return user-friendly messages
export function handlePrismaError(error: unknown): string {
  // Handle known Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return 'EMAIL_ALREADY_REGISTERED'
      case 'P2025':
        return 'RECORD_NOT_FOUND'
      case 'P2003':
        return 'FOREIGN_KEY_CONSTRAINT_FAILED'
      default:
        return `DATABASE_ERROR_${error.code}`
    }
  }

  // Handle Prisma initialization errors
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return 'DATABASE_CONNECTION_FAILED'
  }

  // Handle Prisma unexpected errors
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return 'UNEXPECTED_DATABASE_ERROR'
  }

  // Handle Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return 'INVALID_DATA_PROVIDED'
  }

  return 'UNEXPECTED_PRISMA_ERROR'
}
