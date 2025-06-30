import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'

type ListMediaItemTitleProps = {
  title: string
}

export function ListMediaItemTitle({
  title,
}: ListMediaItemTitleProps): ReactElement {
  return (
    <Body
      size="base-mdt"
      size-sm="base-lgt"
      color="primary"
      font-weight="bold"
      text-overflow="ellipsis"
    >
      {!!title && title}
    </Body>
  )
}
