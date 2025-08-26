'use client'

import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Branding } from '@/components/molecules/branding/branding'
import { MainMenu } from '@/features/nav-bar/components/main-menu/main-menu'
import { Search } from '@/features/nav-bar/components/search/search'
import {
  navBarClassNames,
  navBarContainerClassNames,
} from '@/features/nav-bar/nav-bar.class-names'

type NavBarProps = VariantProps<typeof navBarContainerClassNames> &
  PropsWithChildren<{
    body?: ReactElement
    customActionLabel?: string | null
    customActionOnClick?: () => void | null
    footer?: ReactElement
    header?: ReactElement
    narrow?: boolean
    subnav?: ReactElement
  }>

export function NavBar({
  body,
  position = 'fixed',
  footer,
  header,
  children,
  narrow = false,
  top,
  left,
  right,
  bottom,
  'bg-color': bgColor = 'primary',
  'z-index': zIndex = 90,
  border = true,
  subnav,
}: NavBarProps): ReactElement {
  const navbarContainerClassName = navBarContainerClassNames({
    position,
    top,
    left,
    right,
    bottom,
    'bg-color': bgColor,
    'z-index': zIndex,
    border,
  })
  const navBarClassName = navBarClassNames({
    border,
    subnav: !!subnav,
  })

  return (
    <div className={navbarContainerClassName}>
      <div className={navBarClassName}>
        <Box
          display="flex"
          align-items="center"
          border-color="primary-disabled"
          height={16}
          height-md={24}
        >
          <Container fullHeight narrow={narrow ? 'lg' : undefined}>
            <FlexBox
              flex-direction="row"
              align-items="center"
              justify-content="between"
              gap={3}
              gap-md={0}
              fullHeight
              fullWidth
            >
              {!children && (
                <>
                  <Branding />
                  <Search />
                  <MainMenu header={header} body={body} footer={footer} />
                </>
              )}

              {!!children && children}
            </FlexBox>
          </Container>
        </Box>
      </div>
      {subnav ? (
        <FlexBox
          flex-direction="col"
          padding-y={2}
          bg-color="quaternary"
          shadow="md"
          data-testid="subnav"
        >
          <Container fullHeight center narrow={narrow ? 'lg' : undefined}>
            {subnav}
          </Container>
        </FlexBox>
      ) : null}
    </div>
  )
}
