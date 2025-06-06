'use client'

import Image from 'next/image'
import { ReactElement } from 'react'

import { SliderSlide } from '@/components/organisms/slider/components/slider-slide/slider-slide'
import { Slider } from '@/components/organisms/slider/slider'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailSlider(): ReactElement {
  const {
    listing: { images },
  } = useListingDetailContext()
  const mainImage = images.find((image) => image.isMain) ?? images[0]
  const otherImages = images.filter((image) => image.url !== mainImage.url)

  return (
    <>
      {/* <Display show-md show-lg show-xl show-2xl show-3xl>
        <Grid columns={4} rows={2} gap={1}>
          <GridItem col-span={1} row-span-md={2} max-height="screen-md" min-height="screen-sm">
            <Box border-radius-l="xl" overflow="hidden" fullHeight fullWidth>
              <Image src={mainImage.url} alt={mainImage.url} width={560} height={417} />
            </Box>
          </GridItem>

          <GridItem row-span={2} max-height="screen-md" min-height="screen-sm">
            <Grid columns={2} rows={2} gap={1} fullHeight>
              {otherImages.slice(0, 2).map((image, idx) => (
                <GridItem col-span={1} row-span={1} key={image.url}>
                  <Box
                    border-radius-tr={idx === 0 ? 'none' : 'xl'}
                    overflow="hidden"
                    fullHeight
                    fullWidth
                  >
                    <Image
                      className="w-full h-full object-cover aspect-video"
                      src={image.url}
                      alt={image.url}
                      width={278}
                      height={132}
                    />
                  </Box>
                </GridItem>
              ))}
              {otherImages.slice(2, 4).map((image, idx) => (
                <GridItem row-span={1} key={image.url}>
                  <Box
                    border-radius-br={idx === 0 ? 'none' : 'xl'}
                    overflow="hidden"
                    fullHeight
                    fullWidth
                  >
                    <Image
                      className="w-full h-full object-cover aspect-video"
                      src={image.url}
                      alt={image.url}
                      width={278}
                      height={132}
                    />
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </Display> */}

      {/* <Display show-xs show-sm> */}
      <Slider fullWidth showPagination disableNavigation>
        {images.map((image) => (
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
      {/* </Display> */}
    </>
  )
}
