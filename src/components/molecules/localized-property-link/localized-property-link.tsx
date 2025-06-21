'use client'

import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'

import { useLocalizedNavigation } from '@/hooks/use-localized-navigation'

type LocalizedPropertyLinkProps = {
  propertyId: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function LocalizedPropertyLink({
  propertyId,
  children,
  className,
  onClick,
}: LocalizedPropertyLinkProps): ReactElement {
  const { getLocalizedPath } = useLocalizedNavigation()
  const localizedPropertyPath = getLocalizedPath('property')
  const href = `${localizedPropertyPath}/${propertyId}`

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
