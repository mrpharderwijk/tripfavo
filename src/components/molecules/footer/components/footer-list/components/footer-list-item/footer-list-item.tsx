import { PropsWithChildren, ReactElement } from 'react'

import { Body } from '@/components/atoms/typography/body/body'

type FooterListItemProps = PropsWithChildren

export function FooterListItem({
  children,
}: FooterListItemProps): ReactElement {
  return <Body size="base-sm">{children}</Body>
}
