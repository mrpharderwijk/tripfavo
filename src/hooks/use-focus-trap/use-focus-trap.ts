'use client'

import { createFocusTrap, FocusTrap } from 'focus-trap'
import { RefObject, useEffect, useState } from 'react'

type UseFocusTrapResult = {
  activateTrap: () => void
  deActivateTrap: () => void
}
type UseFocusTrapOptions<T> = {
  ref: RefObject<T | null> | (() => RefObject<T | null>)
  activateOnInit?: boolean
  deactivateOnEscape?: boolean
}

export function useFocusTrap<T extends HTMLElement>({
  ref: refOrCallback,
  deactivateOnEscape = false,
  activateOnInit,
}: UseFocusTrapOptions<T>): UseFocusTrapResult {
  const [trap, setTrap] = useState<null | FocusTrap>(null)

  useEffect(() => {
    const getFocusTrapRef = (): RefObject<T | null> => {
      if (typeof refOrCallback === 'function') {
        const ref = refOrCallback()
        return ref
      }

      return refOrCallback
    }

    const refEl = getFocusTrapRef()

    if (!refEl.current) {
      return
    }

    const focusTrap = createFocusTrap(refEl.current, {
      escapeDeactivates: () => deactivateOnEscape,
    })

    if (activateOnInit) {
      focusTrap.activate()
    }

    setTrap(focusTrap)

    return (): void => {
      if (focusTrap.active) {
        focusTrap.deactivate()
      }
    }
  }, [activateOnInit, refOrCallback, deactivateOnEscape])

  const activateTrap = (): void => {
    trap?.activate()
  }

  const deActivateTrap = (): void => {
    trap?.deactivate()
  }

  return {
    activateTrap,
    deActivateTrap,
  }
}
