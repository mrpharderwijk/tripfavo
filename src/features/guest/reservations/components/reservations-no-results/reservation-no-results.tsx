import { FlexBox } from "@/components/atoms/layout/flex-box/flex-box";
import { Heading } from "@/components/atoms/typography/heading/heading";
import { Text } from "@/components/atoms/typography/text/text";
import { Button } from "@/components/molecules/buttons/button";
import { ButtonWrapper } from "@/components/molecules/buttons/button-wrapper/button-wrapper";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function ReservationNoResults() {
  const tGuestReservations = await getTranslations('guest.reservations')

  return (
    <FlexBox flex-direction="col" fullWidth align-items="center" justify-content="center">
      <FlexBox flex-direction="col" gap={6} max-width="sm" margin-top={10}>
        <Text text-align="center" font-size="base-md">{tGuestReservations('noResults.text')}</Text>

        <FlexBox flex-direction="row" align-items="center" justify-content="center">
          <ButtonWrapper variant="secondary" size="lg" renderRoot={({ buttonContent }) => <Link href='/'>{buttonContent}</Link>}>
            {tGuestReservations('noResults.button')}
          </ButtonWrapper>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}