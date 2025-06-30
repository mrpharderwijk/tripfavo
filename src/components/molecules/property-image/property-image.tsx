import Image from 'next/image'
import { ReactElement } from 'react'

type PropertyImageProps = {
  src: string
  alt: string
}

export function PropertyImage({ src, alt }: PropertyImageProps): ReactElement {
  return <Image src={src} alt={alt} fill className="object-cover" />
}
