import { ReactElement } from 'react'
import {
  Button,
  Column,
  Container,
  Heading,
  Hr,
  Row,
  Section,
  Text,
} from '@react-email/components'

import RootLayout from '@/emails/layout/root-layout'
import { Locale } from '@/i18n/config'

export type EmailVerifyOtpProps = {
  token: string
  locale?: Locale
}

/**
 * EmailVerifyOtp
 * @param {EmailVerifyOtpProps} param0
 * @returns {ReactElement}
 *
 * TODO: translations
 */
export function EmailVerifyOtp({
  token,
  locale,
}: EmailVerifyOtpProps): ReactElement {
  const previewText = `Verify your email`

  return (
    <RootLayout previewText={previewText}>
      <Section className="px-[24px]">
        <Container className="pb-[16px]">
          <Heading>Verify your email</Heading>
          <Text>
            Please verify your email address by entering the code below when
            asked:
          </Text>
        </Container>
        {/* <Container className="pb-[16px]">
          <Row>
            {token.split('').map((char, index) => (
              <Column key={index} align="left">
                <div className="w-[36px] h-[48px] border-[#DDDDDD] border-[1px] border-solid rounded-xl text-[32px] text-center leading-[56px]">
                  {char}
                </div>
              </Column>
            ))}
          </Row>
        </Container> */}

        <Container className="pb-[16px]">
          <Row className="p-[0px] m-[0px] bg-gray-100">
            <Column className="p-[0px] m-[0px]">
              <Text className="text-[32px] text-center leading-[56px] p-[0px] m-[0px]">
                {token}
              </Text>
            </Column>
          </Row>
        </Container>

        <Container className="pb-[16px]">
          <Row>
            <Column className="relative h-[24px]">
              <Hr className="border-[#DDDDDD] border border-solid absolute left-[0px] right-[0px] top-[50%] z-[5] p-[0px] m-[0px]" />
            </Column>
            <Column className="relative h-[24px]">
              <Container className="absolute left-[0px] right-[0px] top-[0px] z-[10] h-[24px]">
                <Text className="text-[#222222] bg-[#FFFFFF] text-[16px] text-center leading-[24px] m-[0px] p-[0px]">
                  or
                </Text>
              </Container>
            </Column>
            <Column className="relative h-[24px]">
              <Hr className="border-[#DDDDDD] border border-solid absolute left-[0px] right-[0px] top-[50%] z-[5] p-[0px] m-[0px]" />
            </Column>
          </Row>
        </Container>

        <Container className="pb-[16px]">
          <Row>
            <Column className="relative h-[24px]">
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-otp?token=${token}`}
                className="bg-[#3730A3] text-[#FFFFFF] h-[38px] text-[16px] text-center leading-[24px] m-[0px] px-[0px] pt-[12px] rounded-xl w-full"
              >
                Verify your email
              </Button>
            </Column>
          </Row>

          <Row>
            <Column>
              <Text className="pb-[0px] mb-[4px]">
                If the above button doesn't work, you can copy and paste the
                following link into your browser:
              </Text>
              <Container className="bg-gray-100 py-[6px] px-[16px] text-[12px]">
                <Text className="p-[0px] m-[0px]">{`${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-otp?token=${token}`}</Text>
              </Container>
            </Column>
          </Row>
        </Container>
      </Section>
    </RootLayout>
  )
}
