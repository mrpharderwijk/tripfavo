import Image from 'next/image'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { PublicListing } from '@/features/listings/types/public-listing'

type ListingImagesProps = {
  images: PublicListing['images']
}

export function ListingImages({ images }: ListingImagesProps): ReactElement {
  const mainImage = images.find((image) => image.isMain) ?? images[0]
  const otherImages = images.filter((image) => image.url !== mainImage.url)

  return (
    <Grid columns={2} rows={2} gap={1}>
      <GridItem row-span={2} max-height="screen-md" min-height="screen-sm">
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
  )
}
