import type { Ref } from 'react'

export type PropsWithRef<T> = {
  ref?: Ref<T | null>
}
