export type PropsWithTestId<T = unknown> = T & {
  'data-testid'?: string
}
