export type PropsWithSearchParams<
  T = Record<string, string | string[] | undefined>,
> = T & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
