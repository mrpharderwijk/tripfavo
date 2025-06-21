'use client'

import { useLocale } from 'next-intl'
import { ButtonHTMLAttributes, ReactElement } from 'react'
import { CalendarDay, Modifiers } from 'react-day-picker'

import { Display } from '@/components/atoms/display/display'
import { LocalizedPrice } from '@/components/atoms/localized-price/localized-price'
import { Body } from '@/components/atoms/typography/body/body'
import { useDatePickerCalendarContext } from '@/components/organisms/date-picker-calendar/providers/date-picker-calendar-context-provider'
import { Locale } from '@/i18n/config'
import { cn } from '@/utils/class-names'

export function CustomDayButton(
  props: {
    day: CalendarDay
    modifiers: Modifiers
  } & ButtonHTMLAttributes<HTMLButtonElement>,
): ReactElement {
  const { day, modifiers, ...buttonProps } = props
  const isSelected = modifiers.selected
  const isStart = modifiers.selected_start
  const isEnd = modifiers.selected_end
  const { getPriceForDate } = useDatePickerCalendarContext()
  const price = getPriceForDate(day.date)
  const locale = useLocale()

  const buttonClassNames = cn(
    'rounded-full w-full h-full aspect-square flex items-center justify-center',
    {
      'opacity-40 cursor-not-allowed line-through decoration-2':
        modifiers.disabled,
      'bg-bg-primary-inverse text-text-primary-inverse hover:bg-primary-hover':
        isSelected && (isStart || isEnd),
      'bg-bg-quaternary text-text-primary': isSelected && !isStart && !isEnd,
      'hover:bg-bg-primary-inverse-hover hover:text-text-primary-inverse':
        !isSelected && !modifiers.disabled,
    },
  )

  return (
    <button
      {...buttonProps}
      className={buttonClassNames}
      tabIndex={0}
      data-testid="custom-daybutton"
      onClick={(e) => {
        if (modifiers.disabled) {
          e.preventDefault()
        }
        buttonProps.onClick?.(e)
      }}
    >
      <div className="flex flex-col items-center">
        <span>{day.date.getDate()}</span>
        {!!price && !modifiers.disabled && (
          <Display show-sm show-md show-lg show-xl show-2xl show-3xl>
            <Body
              tag="span"
              size="base-xs"
              size-sm="base-sm"
              size-md="base-md"
              font-weight="semibold"
            >
              <LocalizedPrice
                price={price}
                locale={locale as Locale}
                minFractionDigits={0}
                maxFractionDigits={0}
              />
            </Body>
          </Display>
        )}
      </div>
    </button>
  )
}
