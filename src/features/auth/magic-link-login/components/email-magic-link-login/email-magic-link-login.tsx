import { ReactElement } from 'react'
import {
  Button,
  Column,
  Container,
  Heading,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components'

import RootLayout from '@/emails/layout/root-layout'
import { Locale } from '@/i18n/config'

export type EmailMagicLinkLoginProps = {
  loginUrl: string
  locale?: Locale
}

/**
 * EmailVerifyOtp
 * @param {EmailMagicLinLoginProps} param0
 * @returns {ReactElement}
 *
 * TODO: translations
 */
export function EmailMagicLinkLogin({
  loginUrl,
  locale,
}: EmailMagicLinkLoginProps): ReactElement {
  const previewText = `Verify your email`

  return (
    <RootLayout previewText={previewText}>
      <Section className="px-[24px]">
        <Container className="pb-[16px]">
          <Heading>Login to your account</Heading>
          <Text className="text-md">
            You are receiving this email because you have requested a login link
            on Tripfavo.com.
          </Text>
        </Container>

        <Container className="pb-[16px]">
          <Row>
            <Column className="relative h-[24px]">
              <Button
                href={loginUrl}
                className="bg-[#3730A3] text-[#FFFFFF] h-[38px] text-[16px] text-center leading-[24px] m-[0px] px-[0px] pt-[12px] rounded-xl w-full"
              >
                Login to your account
              </Button>
            </Column>
          </Row>

          <Row>
            <Column>
              <Text className="pb-[0px] mb-[4px] text-center">
                If the above button doesn't work, click{' '}
                <Link href={loginUrl} className="p-[0px] m-[0px] inline-block">
                  here
                </Link>
                .
              </Text>
            </Column>
          </Row>

          <Row>
            <Column>
              <Text className="text-sm text-center">
                If you did not request this login link, you can safely ignore
                this email.
              </Text>
            </Column>
          </Row>
        </Container>
      </Section>
    </RootLayout>
  )
}
