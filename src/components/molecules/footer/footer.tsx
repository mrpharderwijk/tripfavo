'use client'

// import { useTranslation } from 'react-i18next'

import { FooterCopyright } from './components/footer-copyright/footer-copyright'

import { Container } from '@/components/atoms/layout/container/container'
import { FooterDisclaimer } from '@/components/molecules/footer/components/footer-disclaimer/footer-disclaimer'
import { FooterListItem } from '@/components/molecules/footer/components/footer-list/components/footer-list-item/footer-list-item'
import { FooterList } from '@/components/molecules/footer/components/footer-list/footer-list'

export const Footer = () => {
  // const { t } = useTranslation()

  return (
    <footer className="border-t border-t-gray-light bg-gray-lightest pt-8 md:pt-10 xl:pt-12">
      <Container className="flex flex-col gap-y-6">
        <div className="grid gap-y-6 grid-cols-1 xl:grid-cols-3">
          <FooterList title="Support">
            <FooterListItem>Help Center</FooterListItem>
            <FooterListItem>AirCover</FooterListItem>
            <FooterListItem>Anti-discrimination</FooterListItem>
            <FooterListItem>Disability support</FooterListItem>
            <FooterListItem>Cancellation options</FooterListItem>
            <FooterListItem>Report neighborhood concern</FooterListItem>
          </FooterList>

          <FooterList title="Support">
            <FooterListItem>Help Center</FooterListItem>
            <FooterListItem>AirCover</FooterListItem>
            <FooterListItem>Anti-discrimination</FooterListItem>
            <FooterListItem>Disability support</FooterListItem>
            <FooterListItem>Cancellation options</FooterListItem>
            <FooterListItem>Report a neighborhood concern</FooterListItem>
          </FooterList>

          <FooterList title="Support">
            <FooterListItem>Help Center</FooterListItem>
            <FooterListItem>AirCover</FooterListItem>
            <FooterListItem>Anti-discrimination</FooterListItem>
            <FooterListItem>Disability support</FooterListItem>
            <FooterListItem>Cancellation options</FooterListItem>
            <FooterListItem>Report a neighborhood concern</FooterListItem>
          </FooterList>
        </div>

        <FooterDisclaimer title="Disclaimer">
          The Airbnb Newsroom is aimed at journalists. All Homes and Experiences
          referenced on the Airbnb Newsroom are intended purely to inspire and
          illustrate. Airbnb does not recommend or endorse specific Home or
          Experience listings on the Airbnb platform.
        </FooterDisclaimer>

        <FooterCopyright />
      </Container>
    </footer>
  )
}
