'use client'

import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'

import { useLocalizedNavigation } from '@/hooks/use-localized-navigation'

type LocalizedLinkProps = {
  routeName: string
  children: ReactNode
  className?: string
  exact?: boolean
  onClick?: () => void
}

export function LocalizedLink({
  routeName,
  children,
  className,
  exact = false,
  onClick,
}: LocalizedLinkProps): ReactElement {
  const { getLocalizedPath } = useLocalizedNavigation()
  const href = getLocalizedPath(routeName, exact)

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
