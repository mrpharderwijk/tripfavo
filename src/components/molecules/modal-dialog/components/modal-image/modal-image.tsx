'use client'

import { PropsWithChildren, ReactElement } from 'react'

// import { ImageContainer } from '@/components';

export type ModalImageProps = PropsWithChildren

export function ModalImage({ children }: ModalImageProps): ReactElement {
  return (
    <div className={'none w-60 items-stretch md:flex lg:w-80 xl:w-96'}>
      {/* <ImageContainer fill borderRadius="none"> */}
      {children}
      {/* </ImageContainer> */}
    </div>
  )
}
