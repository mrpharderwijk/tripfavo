import { ReactElement } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'
import { ImInstagram } from 'react-icons/im'
import { ImFacebook2 } from 'react-icons/im'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

export function FooterCopyright(): ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      display="flex"
      flex-direction="col"
      flex-direction-lg="rowReverse"
      align-items-lg="center"
      justify-content-md="center"
      justify-content-lg="between"
      padding-b={6}
      padding-x={6}
      gap-y={3}
    >
      <Box display="flex" display-md="inline-flex" justify-content="center">
        <ul className="inline-flex flex-row nowrap gap-3">
          <li>
            <FaXTwitter fontSize={20} />
          </li>
          <li>
            <ImInstagram fontSize={20} />
          </li>
          <li>
            <BsLinkedin fontSize={20} />
          </li>
          <li>
            <ImFacebook2 fontSize={20} />
          </li>
        </ul>
      </Box>

      <Box display="flex" display-md="inline-flex" justify-content="center">
        <Box
          display="inline-flex"
          flex-direction="col"
          flex-direction-lg="row"
          align-items="start"
          align-items-md="center"
          justify-content="center"
          gap={1}
        >
          <Body tag="label" size="base-sm" color="secondary">
            &copy; {currentYear} TripFavo, All Rights Reserved
          </Body>

          <ul className="flex flex-row nowrap items-center justify-center w-full">
            <li className="text-base-sm lg:before:content-['·'] lg:before:inline-block lg:before:text-center lg:before:w-5">
              Privacy
            </li>
            <li className="text-base-sm not-first:before:content-['·'] not-first:before:inline-block not-first:before:text-center not-first:before:w-5">
              Terms
            </li>
            <li className="text-base-sm not-first:before:content-['·'] not-first:before:inline-block not-first:before:text-center not-first:before:w-5">
              Sitemap
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  )
}
