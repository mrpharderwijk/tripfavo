import { useEffect } from 'react'

export type UseDisableBodyScrollingParams = {
  disabled: boolean
}

export function useDisableBodyScrolling({
  disabled,
}: UseDisableBodyScrollingParams): void {
  useEffect(() => {
    // On destroy remove overflow hidden
    document.body.style.overflow = disabled ? 'hidden' : 'auto'

    return (): void => {
      document.body.style.overflow = 'auto'
    }
  }, [disabled])
}
