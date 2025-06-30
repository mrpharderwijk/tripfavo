import Image from 'next/image'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

type UserInfoProps = {
  imageUrl: string
  title: string
  subtitle: string
}

export function UserInfo({
  imageUrl,
  title,
  subtitle,
}: UserInfoProps): ReactElement {
  return (
    <FlexBox
      tag="section"
      flex-direction="row"
      align-items="center"
      justify-content="start"
      gap={4}
      border-color="tertiary"
    >
      <FlexBoxItem flex="initial">
        <Image
          className="aspect-square rounded-full object-cover"
          src={imageUrl ?? '/placeholder.png'}
          alt={title}
          width={48}
          height={48}
        />
      </FlexBoxItem>
      <FlexBoxItem display="flex" flex-direction="col" gap={1} flex="auto">
        <Heading tag="h3" like="h5-semibold">
          {title}
        </Heading>
        <Body color="secondary" size="base-md">
          {subtitle}
        </Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
