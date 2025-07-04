'use client'

import Image from 'next/image'
import { ReactElement } from 'react'

import { SliderSlide } from '@/components/organisms/slider/components/slider-slide/slider-slide'
import { Slider } from '@/components/organisms/slider/slider'
import { usePropertyDetailContext } from '@/features/properties/property-detail/providers/property-detail-context-provider'

export function PropertyDetailSlider(): ReactElement {
  const {
    property: { images },
  } = usePropertyDetailContext()

  const mainImage = images.find((image) => image.isMain) ?? images[0]
  const otherImages = images.filter((image) => image.url !== mainImage.url)

  return (
    <Slider fullWidth showPagination disableNavigation>
      <SliderSlide key={mainImage.url} width="full">
        <Image
          className="aspect-square md:aspect-video object-cover"
          src={mainImage.url}
          alt={mainImage.url}
          width={1024}
          height={768}
        />
      </SliderSlide>
      {otherImages.map((image) => (
        <SliderSlide key={image.url} width="full">
          <Image
            className="aspect-square md:aspect-video object-cover"
            src={image.url}
            alt={image.url}
            width={1024}
            height={768}
          />
        </SliderSlide>
      ))}
    </Slider>
  )
}
