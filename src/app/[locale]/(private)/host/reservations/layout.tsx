import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { HostMainMenu } from '@/features/host/components/host-main-menu/host-main-menu'
import { HostSidebar } from '@/features/host/components/host-sidebar/host-sidebar'

export default function ReservationsLayout({ children }: Readonly<PropsWithChildren>) {
  const tHost = useTranslations('host')

  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <HostMainMenu />
      </FlexBoxItem>

      <FlexBoxItem margin-top={20} flex="auto" min-height="full">
        <Grid columns={12} height="full">
          <GridItem display="none" display-md="block" tag="aside" col-span={4} height="full">
            <Box border-r={1} border-color="deco" fullHeight>
              <FlexBox
                flex-direction="col"
                padding-x-md={6}
                padding-y-md={5}
                padding-x-lg={18}
                padding-y-lg={10}
                gap={6}
              >
                <Heading tag="h2" like="h4" color="primary" font-weight="bold">
                  {tHost('heading')}
                </Heading>

                <HostSidebar />
              </FlexBox>
            </Box>
          </GridItem>
          <GridItem tag="main" col-span={12} col-span-md={8} height="full">
            <FlexBox
              flex-direction="col"
              padding-x={4}
              padding-y={6}
              padding-x-md={20}
              padding-y-md={10}
              gap={6}
            >
              {children}
            </FlexBox>
          </GridItem>
        </Grid>
      </FlexBoxItem>
    </FlexBox>
  )
}
