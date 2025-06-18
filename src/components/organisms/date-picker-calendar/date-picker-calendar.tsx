import { isSameDay } from 'date-fns'
import { ReactElement, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Button } from '@/components/molecules/buttons/button'
import { CustomDayButton } from '@/components/organisms/date-picker-calendar/components/custom-day-button/custom-day-button'
import { CustomDaycell } from '@/components/organisms/date-picker-calendar/components/custom-day-cell/custom-day-cell'
import { CustomMonth } from '@/components/organisms/date-picker-calendar/components/custom-month/custom-month'
import { CustomMonthCaption } from '@/components/organisms/date-picker-calendar/components/custom-month-caption/custom-month-caption'
import { CustomMonthGrid } from '@/components/organisms/date-picker-calendar/components/custom-month-grid/custom-month-grid'
import { CustomMonths } from '@/components/organisms/date-picker-calendar/components/custom-months/custom-months'
import { CustomNav } from '@/components/organisms/date-picker-calendar/components/custom-nav/custom-nav'
import { CustomRoot } from '@/components/organisms/date-picker-calendar/components/custom-root/custom-root'
import { CustomWeek } from '@/components/organisms/date-picker-calendar/components/custom-week/custom-week'
import { CustomWeekday } from '@/components/organisms/date-picker-calendar/components/custom-week-day/custom-week-day'
import { CustomWeekdays } from '@/components/organisms/date-picker-calendar/components/custom-week-days/custom-week-days'
import { CustomWeeks } from '@/components/organisms/date-picker-calendar/components/custom-weeks/custom-weeks'
import {
  DatePickerCalendarContextProvider,
  DatePrice,
} from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { getPriceForDate } from '@/components/organisms/date-picker-calendar/utils/get-price-for-date'
import { isDateDisabled } from '@/components/organisms/date-picker-calendar/utils/is-date-disabled'
import { Locales } from '@/i18n/routing'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type DatePickerCalendarProps = {
  disabledDates: Date[]
  priceDates: DatePrice[]
  locale: Locales
  selected: DateRange | undefined
  onSelect: (date: DateRange | undefined) => void
}

export function DatePickerCalendar({
  disabledDates,
  priceDates,
  locale,
  selected,
  onSelect,
}: DatePickerCalendarProps): ReactElement {
  const [month, setMonth] = useState<Date>(new Date())

  return (
    <DatePickerCalendarContextProvider
      selected={selected}
      datePrices={priceDates}
      getPriceForDate={(date) => getPriceForDate(date, priceDates)}
    >
      <FlexBox flex-direction="col" gap={4} fullWidth>
        <DayPicker
          components={{
            Root: CustomRoot,
            Day: CustomDaycell,
            DayButton: CustomDayButton,
            Nav: CustomNav,
            Month: CustomMonth,
            Months: CustomMonths,
            MonthCaption: CustomMonthCaption,
            MonthGrid: CustomMonthGrid,
            Weeks: CustomWeeks,
            Week: CustomWeek,
            Weekdays: CustomWeekdays,
            Weekday: CustomWeekday,
          }}
          mode="range"
          selected={selected}
          onSelect={onSelect}
          month={month}
          defaultMonth={new Date()}
          onMonthChange={setMonth}
          disabled={(date) => isDateDisabled(date, disabledDates)}
          locale={localeToDateFnsLocale(locale)}
          formatters={{
            formatWeekdayName: (date) =>
              date.toLocaleDateString(locale, { weekday: 'narrow' }),
            formatMonthCaption: (date) =>
              date.toLocaleDateString(locale, {
                month: 'long',
                year: 'numeric',
              }),
          }}
          className="p-4 bg-bg-primary rounded-lg shadow-lg"
          modifiers={{
            selected_start: (date) =>
              Boolean(selected?.from && isSameDay(date, selected.from)),
            selected_end: (date) =>
              Boolean(selected?.to && isSameDay(date, selected.to)),
          }}
          showOutsideDays={false}
          required
        />

        {selected && (
          <FlexBox
            flex-direction="row"
            align-items="center"
            justify-content="start"
          >
            <Button
              variant="quaternary-inverse"
              size="md"
              underline
              onClick={() => onSelect(undefined)}
            >
              Clear dates
            </Button>
          </FlexBox>
        )}
      </FlexBox>
    </DatePickerCalendarContextProvider>
  )
}
