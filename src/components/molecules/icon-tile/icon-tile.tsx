import { LucideIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'

type IconTitleTileProps = {
  icon?: LucideIcon
  label?: string
}

export function IconTile({ icon: Icon, label }: IconTitleTileProps): ReactElement | null {
  if (!Icon) {
    return null
  }

  return (
    <FlexBox
      fullWidth
      border={1}
      border-color="tertiary"
      border-radius="xl"
      padding={4}
      flex-direction="col"
      align-items="start"
      justify-content="start"
      gap={4}
    >
      <FlexBoxItem width={12} height={12} display="flex" justify-content="start">
        <Icon size={30} />
      </FlexBoxItem>

      {label && (
        <Body
          size="base-lg"
          font-weight="semibold"
          text-align="left"
          text-overflow="ellipsis"
          line-clamp={1}
        >
          {label}
        </Body>
      )}
    </FlexBox>
  )
}
