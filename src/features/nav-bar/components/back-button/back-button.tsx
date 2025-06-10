'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function BackButton({ routePath }: { routePath?: string }) {
  const router = useRouter()

  function handleOnClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!routePath) {
      router.back()
      return
    }
  }

  return (
    <Link href={routePath ?? '#'} className="cursor-pointer" onClick={handleOnClick}>
      <ArrowLeft />
    </Link>
  )
}
