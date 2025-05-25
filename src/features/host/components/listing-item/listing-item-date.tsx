import { format } from 'date-fns'
import { useLocale } from 'next-intl'

import { Body } from '@/components/atoms/typography/body/body'
import { localeToDateFnsLocale } from '@/utils/locale-to-date-fns-locale'

type ListingItemDateProps = {
  createdAt: Date
}

export function ListingItemDate({ createdAt }: ListingItemDateProps) {
  const locale = useLocale()

  return (
    <Body size="base-mdt" color="secondary">
      {format(createdAt, 'PPPP', {
        locale: localeToDateFnsLocale(locale),
      })}{' '}
      -{' '}
      {format(createdAt, 'HH:mm', {
        locale: localeToDateFnsLocale(locale),
      })}
    </Body>
  )
}
