import { useTranslations } from 'next-intl'

import { Body } from '@/components/atoms/typography/body/body'

type ListingItemDateProps = {
  title: string | null
  city?: string
}

export function ListingItemTitle({ title, city }: ListingItemDateProps) {
  const tHost = useTranslations('host')

  return (
    <Body size="base-lgt" color="primary" font-weight="semibold">
      {!!title && title}
      {!title && !!city && `${tHost('listing.yourListing')} ${city}`}
    </Body>
  )
}
