'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'

export function ListingDetailHostInfo(): ReactElement {
  const {
    listing: { host },
  } = useListingDetailContext()
  const tListing = useTranslations('listing')

  return (
    <FlexBox
      tag="section"
      flex-direction="row"
      align-items="center"
      justify-content="start"
      gap={4}
      border-t={1}
      border-b={1}
      border-color="tertiary"
      padding-y={4}
    >
      <FlexBoxItem flex="initial">
        <Image
          className="aspect-square rounded-full object-cover"
          src={host.profileImage ?? '/placeholder.png'}
          alt={host.name?.firstName ?? ''}
          width={48}
          height={48}
        />
      </FlexBoxItem>
      <FlexBoxItem display="flex" flex-direction="col" gap={1} flex="auto">
        <Heading tag="h3" like="h5-semibold">
          {tListing('host.label')} {host.name?.firstName}
        </Heading>
        <Body color="secondary" size="base-md">
          1 month ago
        </Body>
      </FlexBoxItem>
    </FlexBox>
  )
}
