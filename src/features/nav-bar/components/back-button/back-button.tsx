'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  function handleOnClick() {
    router.back()
  }

  return (
    <button className="cursor-pointer" onClick={handleOnClick}>
      <ArrowLeft />
    </button>
  )
}
