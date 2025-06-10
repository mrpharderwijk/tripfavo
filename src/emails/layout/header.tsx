import { Container, Img, Section } from "@react-email/components";

export default function Header() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
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