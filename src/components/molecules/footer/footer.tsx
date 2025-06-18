'use client'

import { ReactElement } from 'react'

// import { useTranslation } from 'react-i18next'
import { FooterCopyright } from './components/footer-copyright/footer-copyright'

export const Footer = (): ReactElement => {
  // const { t } = useTranslation()

  return (
    <footer className="border-t border-border-secondary bg-bg-secondary pt-8 md:pt-10 xl:pt-12">
      <div className="flex flex-col gap-y-6">
        {/* <div className="grid gap-y-6 grid-cols-1 xl:grid-cols-3">
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
        </div> */}

        {/* <FooterDisclaimer title="Disclaimer">
          The TripFavo Newsroom is aimed at journalists. All Homes and Experiences referenced on the
          TripFavo Newsroom are intended purely to inspire and illustrate. TripFavo does not
          recommend or endorse specific Home or Experience listings on the TripFavo platform.
        </FooterDisclaimer> */}

        <FooterCopyright />
      </div>
    </footer>
  )
}
