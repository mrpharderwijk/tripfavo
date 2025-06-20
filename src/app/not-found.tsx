import Link from 'next/link'
import { ReactElement } from 'react'

import { Container } from '@/components/atoms/layout/container/container'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Footer } from '@/components/molecules/footer/footer'
import { NavBar } from '@/features/nav-bar/nav-bar'

export default function NotFound(): ReactElement {
  return (
    <FlexBox flex-direction="col" fullHeight>
      <FlexBoxItem flex="initial">
        <NavBar />
      </FlexBoxItem>

      <FlexBoxItem
        tag="main"
        margin-top={20}
        padding-top={12}
        padding-bottom={32}
        flex="auto"
        min-height="full"
      >
        <Container>
          <FlexBox flex-direction="col" gap={4}>
            <Heading tag="h1" like="h1-semibold">
              Whoopsie Daisy!
            </Heading>
            <Body color="primary" size="base-xl">
              The page you are looking for does not exist.
            </Body>

            <Link href="/">Go back to Home</Link>
          </FlexBox>
        </Container>
      </FlexBoxItem>

      <Footer />
    </FlexBox>
  )
}
