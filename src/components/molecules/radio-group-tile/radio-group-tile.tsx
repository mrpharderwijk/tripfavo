import { LucideIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/utils/class-names'

type RadioGroupTileProps = {
  icon: LucideIcon
  label: string
  selected: boolean
  onClick: (value: string) => void
}

export function RadioGroupTile({
  icon: Icon,
  label,
  onClick,
  selected,
}: RadioGroupTileProps): ReactElement {
  return (
    <div className="w-full">
      <RadioGroupItem value={label} className="peer sr-only" />
      <Label
        htmlFor={label}
        className={cn(
          'w-full rounded-xl border-1 p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
          {
            'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
              selected,
            'border-border-tertiary': !selected,
          },
        )}
        onClick={() => onClick(label)}
      >
        <div className="w-12 h-12 flex justify-start">
          <Icon
            className={cn('transition-all duration-300', {
              'animate-icon-size': selected,
              'size-[30px]': !selected,
            })}
            size={30}
          />
        </div>
        <Body size="base-lg" font-weight="semibold" text-align="left">
          {label}
        </Body>
      </Label>
    </div>
  )
}
