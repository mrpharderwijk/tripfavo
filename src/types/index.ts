import { User, UserRole } from '@prisma/client'

export type ElementTag = {
  tag?:
    | 'div'
    | 'span'
    | 'section'
    | 'aside'
    | 'header'
    | 'footer'
    | 'main'
    | 'article'
    | 'nav'
    | 'ul'
    | 'li'
}

export type TextElementTag =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'

export type PropsWithTestId<T = unknown> = T & {
  'data-testid'?: string
}

export type SafeUser = Omit<
  User,
  | 'createdAt'
  | 'updatedAt'
  | 'emailVerified'
  | 'hashedPassword'
  | 'name'
  | 'role'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
  name: {
    firstName: string
    lastName: string
    middleName: string | null
  } | null
  role: UserRole[]
  status: {
    blocked: boolean
    blockedAt: string | null
  } | null
  profileImage: {
    url: string | null
  } | null
}
