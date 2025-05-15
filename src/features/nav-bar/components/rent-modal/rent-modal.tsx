import { ReactElement, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Text } from '@/components/atoms/typography/text/text'
import { AddressAutocomplete } from '@/components/molecules/address-autocomplete/address-autocomplete'
import { Button } from '@/components/molecules/buttons/button'
import { HeadingGroup } from '@/components/molecules/heading/heading'
import { ModalDialog } from '@/components/molecules/modal-dialog/modal-dialog'
import { useRentForm } from '@/features/nav-bar/components/rent-modal/use-rent-form'
import { useRentModal } from '@/features/nav-bar/components/rent-modal/use-rent-modal'

const enum RentSteps {
  LOCATION = 0,
  INFO = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

export function RentModal(): ReactElement {
  const { isVisible, closeDialog, openDialog } = useRentModal()
  const { handleSubmit, onSubmit, isLoading, control, errors, error } =
    useRentForm()
  const [currentStep, setCurrentStep] = useState<RentSteps>(RentSteps.LOCATION)

  function onPreviousStep(): void {
    setCurrentStep((value) => value - 1)
  }

  function onNextStep(): void {
    setCurrentStep((value) => value + 1)
  }

  return (
    <ModalDialog
      modalHeader={
        <Text tag="h3" font-weight="bold">
          Rent your home
        </Text>
      }
      modalFooter={
        <div className="flex flex-row gap-2 items-center justify-between w-full">
          {currentStep !== RentSteps.LOCATION && (
            <Button
              variant="secondary"
              size="xl"
              type="button"
              onClick={onPreviousStep}
              fullWidth
            >
              Previous
            </Button>
          )}
          <Button
            variant="primary"
            size="xl"
            type="button"
            onClick={onNextStep}
            fullWidth
          >
            Next
          </Button>
        </div>
      }
      isVisible={isVisible}
      onClose={closeDialog}
    >
      <div className="flex flex-col gap-2 pb-6">
        <HeadingGroup
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <Controller
          control={control}
          name="location"
          render={({ field }) => <AddressAutocomplete {...field} />}
        />

        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
      </div>
    </ModalDialog>
  )
}
