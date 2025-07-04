import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { PropsWithChildren, ReactElement } from 'react'

import { anchorClassNames } from '@/components/molecules/anchor/anchor.class-names'
import { cn } from '@/utils/class-names'

type AnchorProps = PropsWithChildren<VariantProps<typeof anchorClassNames>> & {
  href: string
}

export function Anchor({
  children,
  href,
  ...props
}: AnchorProps): ReactElement {
  const anchorClassName = cn('', anchorClassNames({ ...props }))

  return (
    <Link className={anchorClassName} href={href}>
      {children}
    </Link>
  )
}
