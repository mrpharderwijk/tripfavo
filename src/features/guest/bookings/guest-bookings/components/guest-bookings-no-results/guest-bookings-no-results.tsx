import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Text } from '@/components/atoms/typography/text/text'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'

export function GuestBookingsNoResults(): ReactElement {
  const tGuestBookings = useTranslations('guest.bookings')

  return (
    <FlexBox
      flex-direction="col"
      fullWidth
      align-items="center"
      justify-content="center"
    >
      <FlexBox flex-direction="col" gap={6} max-width="sm" margin-top={10}>
        <Text text-align="center" font-size="base-md">
          {tGuestBookings('noResults.text')}
        </Text>

        <FlexBox
          flex-direction="row"
          align-items="center"
          justify-content="center"
        >
          <ButtonWrapper
            variant="secondary"
            size="lg"
            renderRoot={({ buttonContent }) => (
              <Link href="/">{buttonContent}</Link>
            )}
          >
            {tGuestBookings('noResults.button')}
          </ButtonWrapper>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
