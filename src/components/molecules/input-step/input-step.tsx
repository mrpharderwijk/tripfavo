'use client'

import { Minus, PlusIcon } from 'lucide-react'
import type React from 'react'
import { type ChangeEvent, HTMLAttributes, type KeyboardEvent, useRef } from 'react'

import { Button } from '@/components/molecules/buttons/button'

export type InputStepProps = HTMLAttributes<HTMLDivElement> & {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  editable?: boolean
  disabled?: boolean
  disabledIncrement?: boolean
  disabledDecrement?: boolean
  ariaLabel?: string
  ariaLabelIncrement?: string
  ariaLabelDecrement?: string
}

export function InputStep({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  editable = true,
  disabled = false,
  ariaLabel = 'Numeric value',
  ariaLabelIncrement = 'Increase value by',
  ariaLabelDecrement = 'Decrease value by',
  ...props
}: InputStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isMinReached = value <= min
  const isMaxReached = value >= max

  const increment = () => {
    if (disabled || isMaxReached) {
      return
    }

    const newValue = Math.min(value + step, max)
    onChange(newValue)
  }

  const decrement = () => {
    if (disabled || isMinReached) {
      return
    }

    const newValue = Math.max(value - step, min)
    onChange(newValue)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || !editable) {
      return
    }

    onChange(e.target.value as unknown as number)
  }

  const handleInputBlur = () => {
    if (disabled || !editable) return

    let newValue = Number.parseFloat(value.toString())

    if (isNaN(newValue)) {
      newValue = value
    } else {
      newValue = Math.max(min, Math.min(max, newValue))
    }

    onChange(newValue)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      increment()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      decrement()
    } else if (e.key === 'Enter') {
      handleInputBlur()
      inputRef.current?.blur()
    }
  }

  return (
    <div
      className={`
        flex
        items-center
        w-28
      `}
      {...props}
    >
      <Button
        variant="outline"
        rounded
        size="xs"
        icon={Minus}
        onClick={decrement}
        disabled={disabled || isMinReached}
        aria-label={`${ariaLabelDecrement} ${step}`}
      />

      <div
        className={`
          relative
          mx-2
          w-10
          text-center
        `}
      >
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-label={ariaLabel}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className={`
              h-9 
              w-full 
              border-0 
              bg-transparent 
              p-0 
              text-center 
              focus:outline-none
              focus:ring-0
              [-moz-appearance:textfield]
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none
              disabled:text-text-secondary-disabled
            `}
          readOnly={!editable}
        />
      </div>

      <Button
        variant="outline"
        rounded
        size="xs"
        icon={PlusIcon}
        onClick={increment}
        disabled={disabled || isMaxReached}
        aria-label={`${ariaLabelIncrement} ${step}`}
      />
    </div>
  )
}
