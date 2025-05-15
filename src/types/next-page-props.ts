export type NextPageParams<K = unknown> = Promise<{ locale: string } & K>
export type NextPageProps<K, T = unknown> = Omit<T, 'searchParams'> & {
  params: NextPageParams<K>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}
