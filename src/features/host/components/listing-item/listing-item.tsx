'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { ListingItemActions } from '@/features/host/components/listing-item/listing-item-actions'
import { ListingItemDate } from '@/features/host/components/listing-item/listing-item-date'
import { ListingItemStatus } from '@/features/host/components/listing-item/listing-item-status'
import { ListingItemTitle } from '@/features/host/components/listing-item/listing-item-title'
import { HostListing } from '@/features/host/types/host-listing'

type ListingItemProps = HostListing

export function ListingItem({
  id,
  title,
  location,
  images,
  status,
  createdAt,
}: ListingItemProps): ReactElement {
  const router = useRouter()

  const featuredImage = images?.find((image) => image.isMain) ?? images?.[0] ?? null

  function handleOnClickListing(listingId: string) {
    router.push(`/host/${listingId}/structure`)
  }

  return (
    <FlexBox flex-direction="row" gap={4} fullWidth>
      <FlexBoxItem flex="auto">
        <div
          className="relative hover:bg-bg-secondary focus:bg-bg-secondary border border-deco rounded-2xl cursor-pointer"
          onClick={() => handleOnClickListing(id)}
        >
          <ListingItemActions id={id} />
          <ListingItemStatus status={status} />
          <FlexBox flex-direction="row" gap={4} padding={4}>
            <FlexBoxItem flex="initial">
              <Box width={16} height={16} border-radius="xl" bg-color="deco" overflow="hidden">
                {!!images?.length && !!featuredImage && (
                  <Image
                    src={featuredImage?.url}
                    alt={featuredImage?.fileName}
                    width={64}
                    height={64}
                    className="object-cover aspect-square"
                  />
                )}
              </Box>
            </FlexBoxItem>
            <FlexBox flex-direction="col" gap={2} align-items="start" justify-content="center">
              <ListingItemTitle title={title} city={location?.city} />
              <ListingItemDate createdAt={createdAt} />
            </FlexBox>
          </FlexBox>
        </div>
      </FlexBoxItem>
    </FlexBox>
  )
}
