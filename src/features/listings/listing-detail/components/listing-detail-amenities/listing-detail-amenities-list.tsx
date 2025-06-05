import { LucideIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'

type ListingDetailAmenitiesListProps = {
  amenities: { label: string; icon: LucideIcon | null }[]
}
export function ListingDetailAmenitiesList({
  amenities,
}: ListingDetailAmenitiesListProps): ReactElement {
  return (
    <FlexBox tag="ul" flex-direction="col" gap={6}>
      {amenities.map(({ icon: Icon, label }) => (
        <FlexBoxItem
          key={label}
          tag="li"
          flex="initial"
          display="flex"
          flex-direction="row"
          align-items="center"
          justify-content="start"
          gap={4}
        >
          <FlexBoxItem flex="initial">{Icon && <Icon size={24} />}</FlexBoxItem>
          <FlexBoxItem flex="auto">{label}</FlexBoxItem>
        </FlexBoxItem>
      ))}
    </FlexBox>
  )
}
