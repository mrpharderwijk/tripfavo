import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Text } from '@/components/atoms/typography/text/text'
import { ButtonWrapper } from '@/components/molecules/buttons/button-wrapper/button-wrapper'

export async function GuestReservationsNoResults(): Promise<ReactElement> {
  const tGuestReservations = await getTranslations('guest.reservations')

  return (
    <FlexBox
      flex-direction="col"
      fullWidth
      align-items="center"
      justify-content="center"
    >
      <FlexBox flex-direction="col" gap={6} max-width="sm" margin-top={10}>
        <Text text-align="center" font-size="base-md">
          {tGuestReservations('noResults.text')}
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
            {tGuestReservations('noResults.button')}
          </ButtonWrapper>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
