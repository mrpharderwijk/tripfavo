import { ReactElement } from 'react'
import { Container, Img, Section } from '@react-email/components'

export default function Header(): ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://www.tripfavo.com'
  return (
    <Section className="px-[24px] py-[16px]">
      <Container>
        <Img
          src={`${baseUrl}/tripfavo.png`}
          width="32"
          height="32"
          alt="TripFavo"
        />
      </Container>
    </Section>
  )
}
