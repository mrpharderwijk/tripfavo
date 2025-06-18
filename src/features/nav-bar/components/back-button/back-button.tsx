'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent, ReactElement } from 'react'

export function BackButton({
  routePath,
}: {
  routePath?: string
}): ReactElement {
  const router = useRouter()

  function handleOnClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (!routePath) {
      router.back()
      return
    }
  }

  return (
    <Link
      href={routePath ?? '#'}
      className="cursor-pointer"
      onClick={handleOnClick}
    >
      <ArrowLeft />
    </Link>
  )
}
