import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'
import { MouseEventHandler } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Button } from '@/components/molecules/buttons/button'

export function CustomNav(props: {
  onPreviousClick?: MouseEventHandler<HTMLButtonElement>
  onNextClick?: MouseEventHandler<HTMLButtonElement>
  previousMonth?: Date
  nextMonth?: Date
}): ReactElement {
  const tCommon = useTranslations('common')

  return (
    <Box
      display="flex"
      flex-direction="row"
      justify-content="between"
      position="absolute"
      top={0}
      left={0}
      right={0}
      z-index={10}
      fullWidth
      data-testid="custom-nav"
    >
      <Button
        variant="quaternary"
        size="sm"
        onClick={props.onPreviousClick}
        // disabled={isPreviousMonthDisabled}
      >
        {tCommon('previous')}
      </Button>
      <Button variant="quaternary" size="sm" onClick={props.onNextClick}>
        {tCommon('next')}
      </Button>
    </Box>
  )
}
