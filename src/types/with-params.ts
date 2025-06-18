export type WithParams<T = unknown> = T & {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}
