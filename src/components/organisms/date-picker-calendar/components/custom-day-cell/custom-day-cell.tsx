import { ReactElement } from 'react'
import { DayProps } from 'react-day-picker'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { useDatePickerCalendarContext } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { cn } from '@/utils/class-names'

/** Wrapper for the day cell */
export function CustomDaycell({ children, day, modifiers }: DayProps): ReactElement {
  const isStart = modifiers.selected_start
  const isEnd = modifiers.selected_end
  const isInRange = modifiers.selected && !isStart && !isEnd
  const { selected } = useDatePickerCalendarContext()

  const dayCellClassNames = cn('w-full h-full', {
    'bg-bg-quaternary': isInRange,
    'bg-bg-quaternary rounded-tl-full rounded-bl-full': isStart && selected?.to,
    'bg-bg-quaternary rounded-tr-full rounded-br-full': isEnd && selected?.from,
  })

  return (
    <FlexBox
      align-items="center"
      justify-content="center"
      fullWidth
      fullHeight
      data-testid="custom-daycell"
    >
      <div className={dayCellClassNames} data-testid="custom-daycell-label-wrapper">
        {children ?? <Body color="primary">{day.date.getDate()}</Body>}
      </div>
    </FlexBox>
  )
}
