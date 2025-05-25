import type { Ref } from 'react'

export type WithRef<T> = {
  ref?: Ref<T | null>
}
