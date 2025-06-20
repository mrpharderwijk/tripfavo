import { Locale } from '@/i18n/config'

export type NextPageParams<K = unknown> = Promise<{ locale: Locale } & K>
export type NextPageProps<K, T = unknown> = Omit<T, 'searchParams'> & {
  params: NextPageParams<K>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}
