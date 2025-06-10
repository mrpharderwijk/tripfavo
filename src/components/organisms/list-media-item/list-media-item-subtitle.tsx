import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'

type ListMediaItemSubTitleProps = {
  subtitle: string
}

export function ListMediaItemSubTitle({ subtitle }: ListMediaItemSubTitleProps): ReactElement {
  return (
    <Body size="base-mdt" color="secondary">
      {subtitle}
    </Body>
  )
}
