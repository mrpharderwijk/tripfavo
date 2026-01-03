export type PropsWithParams<T = unknown> = T & {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}
