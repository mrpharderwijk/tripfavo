'use client'

import { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactElement } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { amenities as amenitiesConstants } from '@/constants/amenities'
import { ListingDetailAmenitiesList } from '@/features/listings/listing-detail/components/listing-detail-amenities/listing-detail-amenities-list'
import { useListingDetailContext } from '@/features/listings/listing-detail/providers/listing-detail-context-provider'
import { useDialogContext } from '@/features/nav-bar/providers/dialog-context-provider'
import { toCamelCase } from '@/utils/casing/to-camel-case'

export function ListingDetailAmenities(): ReactElement {
  const tListingAmenities = useTranslations('listing.amenities')
  const tCommonAmenities = useTranslations('common.amenities')
  const tCommon = useTranslations('common')
  const {
    listing: { amenities },
  } = useListingDetailContext()
  const { openDialog, closeDialog, currentOpenDialog } = useDialogContext()

  const amenitiesWithIcons = amenities.reduce<
    Array<{ label: string; icon: LucideIcon | null }>
  >((acc, amenity) => {
    if (!amenity?.type) {
      return acc
    }

    const amenityLabel = amenity?.type
      ? tCommonAmenities(toCamelCase(amenity?.type))
      : 'No label'
    const amenityConstant = amenitiesConstants.find(
      (amenityConstant) => amenityConstant.value === amenity.type,
    )
    const amenityIcon = amenityConstant?.icon || null

    return [...acc, { label: amenityLabel, icon: amenityIcon }]
  }, [])

  function handleOnClickShowAllAmenities(): void {
    openDialog('amenities-show-all')
  }

  return (
    <FlexBox tag="section" flex-direction="col" gap={6}>
      {tListingAmenities('heading') && (
        <Heading tag="h2" like="h3-semibold">
          {tListingAmenities('heading')}
        </Heading>
      )}

      <ListingDetailAmenitiesList amenities={amenitiesWithIcons.slice(0, 6)} />

      {/* <ListingDetailAmenitiesTileList amenities={amenitiesWithIcons.slice(0, 6)} /> */}

      <Button
        variant="quaternary"
        size="xl"
        onClick={handleOnClickShowAllAmenities}
      >
        {tListingAmenities('showAll.button', {
          amount: amenitiesWithIcons.length,
        })}
      </Button>

      <ModalDialog
        isVisible={!!currentOpenDialog}
        onClose={() => closeDialog('amenities-show-all')}
        header={<>{tListingAmenities('showAll.dialog.header')}</>}
        footer={
          <Button
            variant="quaternary"
            size="xl"
            onClick={() => closeDialog('amenities-show-all')}
            fullWidth
          >
            {tCommon('close')}
          </Button>
        }
      >
        <FlexBox flex-direction="col" gap={4}>
          <ListingDetailAmenitiesList amenities={amenitiesWithIcons} />
        </FlexBox>
      </ModalDialog>
    </FlexBox>
  )
}
