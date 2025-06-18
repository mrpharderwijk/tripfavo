import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import {
  ListingMediaItemStatus,
  ListMediaItemStatus,
} from '@/components/organisms/list-media-item/list-media-item-status'
import { ListMediaItemSubTitle } from '@/components/organisms/list-media-item/list-media-item-subtitle'
import { ListMediaItemTitle } from '@/components/organisms/list-media-item/list-media-item-title'

type ListMediaItemProps = {
  href: string
  status?: ListingMediaItemStatus
  image: {
    url: string
    fileName: string
  } | null
  title: string
  subtitle: string
}

export function ListMediaItem({
  href,
  image,
  title,
  subtitle,
  status,
}: ListMediaItemProps): ReactElement {
  return (
    <FlexBox flex-direction="row" gap={4} fullWidth>
      <Link
        href={href}
        className="relative hover:bg-bg-secondary focus:bg-bg-secondary border border-deco rounded-2xl cursor-pointer w-full"
      >
        <FlexBox flex-direction="row" gap={4} padding={4}>
          <FlexBoxItem flex="initial">
            <Box width={16} height={16}>
              {status && <ListMediaItemStatus status={status} />}
              {!!image && (
                <Image
                  src={image?.url}
                  alt={image?.fileName}
                  width={64}
                  height={64}
                  className="object-cover aspect-square rounded-xl"
                />
              )}
            </Box>
          </FlexBoxItem>
          <FlexBox
            flex-direction="col"
            gap={2}
            align-items="start"
            justify-content="center"
          >
            <ListMediaItemTitle title={title} />
            <ListMediaItemSubTitle subtitle={subtitle} />
          </FlexBox>
        </FlexBox>
      </Link>
    </FlexBox>
  )
}
