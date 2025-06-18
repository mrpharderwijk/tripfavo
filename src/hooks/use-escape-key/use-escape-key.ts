'use client'

import { useCallback, useEffect } from 'react'

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keyup'

export function useEscapeKey(handler: () => void, isActive = true): void {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handler()
      }
    },
    [handler],
  )

  useEffect(() => {
    if (!isActive) {
      return
    }

    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return (): void => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [handleEscKey, isActive])
}
