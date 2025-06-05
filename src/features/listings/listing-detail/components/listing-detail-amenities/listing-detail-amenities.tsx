'use client'

import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { IconTile } from '@/components/molecules/icon-tile/icon-tile'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { amenities as amenitiesConstants } from '@/constants/amenities'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { toCamelCase } from '@/utils/casing/to-camel-case'

export function ListingDetailAmenities(): ReactElement {
  const tListingAmenities = useTranslations('listing.amenities')
  const tCommonAmenities = useTranslations('common.amenities')
  const {
    listing: { amenities },
  } = useListingDetailContext()
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()

  const amenitiesWithIcons = amenities
    .map((amenity) => {
      if (!amenity?.type) {
        return null
      }

      const amenityLabel = amenity?.type ? tCommonAmenities(toCamelCase(amenity?.type)) : 'No label'
      const amenityConstant = amenitiesConstants.find(
        (amenityConstant) => amenityConstant.value === amenity.type,
      )
      const amenityIcon = amenityConstant?.icon || null

      return { label: amenityLabel, icon: amenityIcon }
    })
    .filter(Boolean)

  function handleOnClickShowAllAmenities() {
    openDialog('amenities-show-all')
  }

  return (
    <FlexBox tag="section" flex-direction="col" gap={6}>
      {tListingAmenities('heading') && (
        <Heading tag="h2" like="h3-semibold">
          {tListingAmenities('heading')}
        </Heading>
      )}

      <Grid columns-xs={1} columns-sm={2} columns-md={3} gap={4}>
        {amenitiesWithIcons.slice(0, 6).map((amenityWithIcon) => {
          return (
            amenityWithIcon?.icon && (
              <GridItem col-span={1} key={amenityWithIcon?.label}>
                <IconTile icon={amenityWithIcon?.icon} label={amenityWithIcon?.label} />
              </GridItem>
            )
          )
        })}
      </Grid>

      <Button variant="quaternary" size="xl" onClick={handleOnClickShowAllAmenities}>
        {tListingAmenities('showAll.button', { amount: amenitiesWithIcons.length })}
      </Button>

      <ModalDialog
        isVisible={!!currentOpenDialog}
        onClose={() => closeDialog('amenities-show-all')}
        header={<>{tListingAmenities('showAll.dialog.header')}</>}
      >
        <FlexBox flex-direction="col" gap={4}>
          {amenitiesWithIcons.map((amenityWithIcon) => {
            return (
              amenityWithIcon?.icon && (
                <IconTile
                  key={amenityWithIcon.label}
                  icon={amenityWithIcon?.icon}
                  label={amenityWithIcon?.label}
                />
              )
            )
          })}
        </FlexBox>
      </ModalDialog>
    </FlexBox>
  )
}
