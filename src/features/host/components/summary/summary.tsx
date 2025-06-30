'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { ComponentStepProps } from '@/features/host/listings/types/component-step-props'

type SummaryProps = {
  title: string
  description: string
}

export function Summary({ listing }: ComponentStepProps): ReactElement {
  console.log('listing: ', listing)
  const tStructureSummary = useTranslations('host.listing.structure.summary')

  const structure = listing?.structure

  return (
    <FlexBox
      flex-direction="row"
      gap={4}
      border-b={1}
      padding-y={6}
      border-color="deco"
      align-items="start"
      justify-content="start"
    >
      <FlexBoxItem display="flex" flex-direction="col" flex="auto" gap={1}>
        <Body tag="span" color="primary" font-weight="bold">
          {tStructureSummary('title')}
        </Body>

        <FlexBox flex-direction="col" gap={6}>
          <Body tag="span" color="secondary" size="base-md">
            {tStructureSummary('description')}
          </Body>
        </FlexBox>
      </FlexBoxItem>
    </FlexBox>
  )
}
