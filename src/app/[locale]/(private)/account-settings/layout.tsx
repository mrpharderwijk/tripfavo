import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { AccountSidebar } from '@/features/account-settings/components/account-sidebar/account-sidebar'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const tAccount = useTranslations('account')

  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar />
      </FlexBoxItem>

      <FlexBoxItem flex="auto" min-height="full">
        <Grid grid-cols={12} height="full">
          <GridItem tag="aside" col-span={4} height="full">
            <Box border-r={1} border-color="deco" fullHeight>
              <FlexBox flex-direction="col" padding-x={18} padding-y={10} gap={6}>
                <Heading tag="h2" like="h4" color="primary" font-weight="bold">
                  {tAccount('heading')}
                </Heading>

                <AccountSidebar />
              </FlexBox>
            </Box>
          </GridItem>
          <GridItem tag="main" col-span={8} height="full">
            {children}
          </GridItem>
        </Grid>
      </FlexBoxItem>
    </FlexBox>
  )
}
