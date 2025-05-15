'use client'

import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Branding } from '@/components/molecules/branding/branding'
import { Search } from '@/features/nav-bar/components/search/search'
import { UserMenu } from '@/features/nav-bar/components/user-menu/user-menu'

type NavBarProps = {
  minimal?: boolean
  customAction?: ReactElement | null
}

export function NavBar({ minimal = false, customAction = null }: NavBarProps): ReactElement {
  return (
    <div className="fixed w-full bg-grey-0 z-10 shadow-sm top-0 left-0 right-0">
      <Box border-color="primary-disabled" height={20} height-md={24}>
        <Container>
          <FlexBox
            flex-direction="row"
            align-items="center"
            justify-content="between"
            gap={3}
            gap-md={0}
          >
            <Branding />
            {!minimal && <Search />}
            {!minimal && <UserMenu />}
            {!!customAction && customAction}
          </FlexBox>
        </Container>
      </Box>
    </div>
  )
}
