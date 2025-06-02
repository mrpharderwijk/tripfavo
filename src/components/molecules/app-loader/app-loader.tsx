'use client'

import { ReactElement, useEffect, useRef, useState } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Body } from '@/components/atoms/typography/body/body'
import { cn } from '@/utils/class-names'

type AppLoaderProps = {
  message?: string | null
  loading?: boolean
}

export function AppLoader({ message, loading = false }: AppLoaderProps): ReactElement | null {
  const [isVisible, setIsVisible] = useState(false)
  const [delayedMessage, setDelayedMessage] = useState<string | null | undefined>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (loading) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(true)
      setDelayedMessage(message)
    } else {
      // Set a timeout to hide the loader after the fade out animation
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        setDelayedMessage(null)
      }, 300) // Match this with the CSS transition duration
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [loading, delayedMessage, message])

  if (!isVisible && !loading) {
    return null
  }

  return (
    <div
      className={cn('fixed inset-0 z-50 bg-white transition-opacity duration-300 ease-in-out', {
        'opacity-100': !isVisible,
        'opacity-0 pointer-events-none': isVisible,
      })}
    >
      <Grid fullWidth fullHeight place-items="center">
        <FlexBox flex-direction="col" gap={4}>
          <DotLoader />
          {delayedMessage && (
            <Body size="base-lgt" color="primary" font-weight="semibold">
              <span className="relative after:content-[''] after:animate-dot after:absolute after:w-6 after:h-6 after:-right-6 after:inline-block">
                {delayedMessage}
              </span>
            </Body>
          )}
        </FlexBox>
      </Grid>
    </div>
  )
}
