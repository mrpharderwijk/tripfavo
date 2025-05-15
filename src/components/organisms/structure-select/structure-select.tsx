import { ReactElement, useState } from 'react'
import { Control, FieldValues } from 'react-hook-form'

import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Body } from '@/components/atoms/typography/body/body'
import { FormField } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { categories } from '@/constants/categories'
import { cn } from '@/utils/class-names'

type StructureSelectProps = { control: Control<FieldValues> }

export function StructureSelect({
  control,
}: StructureSelectProps): ReactElement {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(
    'House',
  )

  function handleOnValueChange(value: string): void {
    setSelectedStructure(value)
  }

  return (
    <FormField
      control={control}
      name="structure"
      render={({ field }) => (
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
          <Grid grid-cols={1} grid-cols-md={3} gap={4}>
            {categories.map(({ label, icon: Icon }) => (
              <GridItem col-span={1} key={label}>
                <div className="w-full">
                  <RadioGroupItem value={label} className="peer sr-only" />
                  <Label
                    htmlFor={label}
                    className={cn(
                      'w-full rounded-xl border-1 p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
                      {
                        'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
                          field.value === selectedStructure,
                        'border-border-tertiary':
                          field.value !== selectedStructure,
                      },
                    )}
                  >
                    <div className="w-12 h-12 flex justify-start">
                      <Icon
                        className={cn('transition-all duration-300', {
                          'animate-icon-size':
                            field.value === selectedStructure,
                          'size-[30px]': field.value !== selectedStructure,
                        })}
                        size={30}
                      />
                    </div>
                    <Body
                      size="base-lg"
                      font-weight="semibold"
                      text-align="left"
                    >
                      {label} {field.value}
                    </Body>
                  </Label>
                </div>
                {/* <RadioGroupTile
                  icon={categoryItem.icon}
                  label={categoryItem.label}
                  selected={selectedStructure === categoryItem.label}
                  onClick={() => setSelectedStructure(categoryItem.label)}
                /> */}
              </GridItem>
            ))}
          </Grid>
        </RadioGroup>
      )}
    />
  )
}
