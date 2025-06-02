import { ReactElement } from 'react'
import { PropsWithChildren } from 'react'

export function DotList({ children }: PropsWithChildren): ReactElement {
  return <ul className="flex flex-row flex-wrap gap-2">{children}</ul>
}
