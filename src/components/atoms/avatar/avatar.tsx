import Image from 'next/image'
import { ReactElement } from 'react'

import { avatarClassNames } from '@/components/atoms/avatar/avatar.class-names'

export type AvatarProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null
}
const avatarSizeMap = {
  xs: 24,
  sm: 34,
  md: 40,
  lg: 48,
  xl: 56,
}

export function Avatar({ size }: AvatarProps): ReactElement | null {
  if (!size) {
    return null
  }

  const avatarClassName = avatarClassNames({ size })

  return (
    <Image
      className={avatarClassName}
      width={avatarSizeMap[size]}
      height={avatarSizeMap[size]}
      alt="Avatar"
      src="/placeholder.png"
    />
  )
}
