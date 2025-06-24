'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Text } from '@/components/atoms/typography/text/text'
import { AppShellContainerItem } from '@/components/molecules/layout/app-shell/app-shell-container-item'

export function HostBookingsNoResults(): ReactElement {
  const tHostBookings = useTranslations('host.bookings')

  return (
    <AppShellContainerItem>
      <FlexBox
        flex-direction="col"
        fullWidth
        align-items="center"
        justify-content="center"
      >
        <FlexBox flex-direction="col" gap={6} max-width="sm" margin-top={10}>
          <Text text-align="center" font-size="base-md">
            {tHostBookings('noResults.text')}
          </Text>
        </FlexBox>
      </FlexBox>
    </AppShellContainerItem>
  )
}
