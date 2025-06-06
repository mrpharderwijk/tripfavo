'use client'

import { VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Branding } from '@/components/molecules/branding/branding'
import { Button } from '@/components/molecules/buttons/button'
import { MainMenu } from '@/features/nav-bar/components/main-menu/main-menu'
import { Search } from '@/features/nav-bar/components/search/search'
import { navBarClassNames } from '@/features/nav-bar/nav-bar.class-names'

type NavBarProps = VariantProps<typeof navBarClassNames> & {
  body?: ReactElement
  customActionLabel?: string | null
  customActionOnClick?: () => void | null
  footer?: ReactElement
  header?: ReactElement
  minimal?: boolean
  narrow?: boolean
}

export function NavBar({
  body,
  customActionLabel = null,
  customActionOnClick,
  fixed = true,
  footer,
  header,
  minimal = false,
  narrow = false,
}: NavBarProps): ReactElement {
  const navBarClassName = navBarClassNames({ fixed })

  return (
    <div className={navBarClassName}>
      <Box border-color="primary-disabled" height={20} height-md={24}>
        <Container narrow={narrow ? 'lg' : undefined}>
          <FlexBox
            flex-direction="row"
            align-items="center"
            justify-content="between"
            gap={3}
            gap-md={0}
          >
            <Branding />
            {!minimal && <Search />}
            {!minimal && <MainMenu header={header} body={body} footer={footer} />}
            {!!minimal && (
              <Heading tag="h1" like="h3-semibold">
                Reservation
              </Heading>
            )}
            {!!minimal && !customActionLabel && <div />}
            {!!minimal && !!customActionLabel && !!customActionOnClick && (
              <Button variant="outline" size="md" rounded onClick={customActionOnClick}>
                {customActionLabel}
              </Button>
            )}
          </FlexBox>
        </Container>
      </Box>
    </div>
  )
}
