import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import {
  ListingMediaItemStatus,
  ListMediaItemStatus,
} from '@/components/organisms/list-media-item/list-media-item-status'
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
    <FlexBox
      flex-direction="row"
      gap={4}
      fullWidth
      border-color="deco"
      border={1}
      border-radius="2xl"
      overflow="hidden"
    >
      <Link
        href={href}
        className="relative hover:bg-bg-secondary focus:bg-bg-secondary cursor-pointer w-full"
      >
        <FlexBox
          flex-direction="row"
          align-items="start"
          gap={4}
          padding={2}
          padding-md={4}
        >
          <FlexBoxItem flex="initial">
            <Box
              width={16}
              width-sm={20}
              width-md={28}
              height={16}
              height-sm={20}
              height-md={28}
            >
              {status && <ListMediaItemStatus status={status} />}
              {!!image && (
                <Image
                  src={image?.url}
                  alt={image?.fileName}
                  width={112}
                  height={112}
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
            {/* <ListMediaItemSubTitle subtitle={subtitle} /> */}

            <FlexBoxItem flex-direction="row" gap={2} fullWidth>
              <FlexBoxItem flex-direction="col" flex-basis="1/2" gap={1}>
                <Body size="base-xs" color="secondary">
                  Check in
                </Body>
                <Body size="base-xs" color="primary" font-weight="semibold">
                  22 September 2025
                </Body>
              </FlexBoxItem>
              <FlexBoxItem flex-direction="col" flex-basis="1/2" gap={1}>
                <Body size="base-xs" color="secondary">
                  Check Out
                </Body>
                <Body size="base-xs" color="primary" font-weight="semibold">
                  31 September 2025
                </Body>
              </FlexBoxItem>
            </FlexBoxItem>
          </FlexBox>
        </FlexBox>
      </Link>
    </FlexBox>
  )
}
