import { LucideIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { IconTile } from '@/components/molecules/icon-tile/icon-tile'

type ListingDetailAmenitiesTileListProps = {
  amenities: { label: string; icon: LucideIcon | null }[]
}
export function ListingDetailAmenitiesTileList({
  amenities,
}: ListingDetailAmenitiesTileListProps): ReactElement {
  return (
    <Grid columns-xs={1} columns-sm={2} columns-md={3} gap={4}>
      {amenities.slice(0, 6).map(({ icon: Icon, label }) => {
        return (
          Icon && (
            <GridItem col-span={1} key={label}>
              <IconTile icon={Icon} label={label} />
            </GridItem>
          )
        )
      })}
    </Grid>
  )
}
