'use client'

import { useRouter } from 'next/navigation'
import {
  ComponentType,
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { AmenitiesForm } from '@/features/host/listings/host-listing-detail-funnel/components/forms/amenities-form/amenities-form'
import { DescriptionForm } from '@/features/host/listings/host-listing-detail-funnel/components/forms/description-form/description-form'
import {
  FloorPlanForm,
  FloorPlanFormSchema,
} from '@/features/host/listings/host-listing-detail-funnel/components/forms/floor-plan-form/floor-plan-form'
import { GuestsAmountForm } from '@/features/host/listings/host-listing-detail-funnel/components/forms/guests-amount-form/guests-amount-form'
import {
  ImagesForm,
  ImagesFormSchema,
} from '@/features/host/listings/host-listing-detail-funnel/components/forms/images-form/images-form'
import {
  LocationForm,
  LocationFormSchema,
} from '@/features/host/listings/host-listing-detail-funnel/components/forms/location-form/location-form'
import { NeighbourhoodDescriptionForm } from '@/features/host/listings/host-listing-detail-funnel/components/forms/neighbourhood-description-form/neighbourhood-description-form'
import { PriceForm } from '@/features/host/listings/host-listing-detail-funnel/components/forms/price-form/price-form'
import {
  PrivacyTypeForm,
  PrivacyTypeFormSchema,
} from '@/features/host/listings/host-listing-detail-funnel/components/forms/privacy-type-form/privacy-type-form'
import {
  StructureForm,
  StructureFormSchema,
} from '@/features/host/listings/host-listing-detail-funnel/components/forms/structure-form/sturcture-form'
import { TitleForm } from '@/features/host/listings/host-listing-detail-funnel/components/forms/title-form/title-form'
import { ComponentStepProps } from '@/features/host/listings/types/component-step-props'
import { getRoutePathByRouteName } from '@/utils/get-route'

type StepForm =
  | z.infer<typeof StructureFormSchema>
  | z.infer<typeof PrivacyTypeFormSchema>
  | z.infer<typeof LocationFormSchema>
  | z.infer<typeof FloorPlanFormSchema>
  | z.infer<typeof ImagesFormSchema>
type StepType = {
  url: string
  order: number
  form?: UseFormReturn<StepForm>
  component?: ComponentType<ComponentStepProps>
  onSubmitCallback?: (data: z.infer<any>) => Promise<boolean>
}
export const enum HOST_STEP {
  Structure = 'structure',
  PrivacyType = 'privacy-type',
  Location = 'location',
  FloorPlan = 'floor-plan',
  Images = 'images',
  Description = 'description',
  NeighbourhoodDescription = 'neighbourhood-description',
  Title = 'title',
  Amenities = 'amenities',
  Price = 'price',
  GuestsAmount = 'guests-amount',
}

export const stepMap = {
  [HOST_STEP.Structure]: {
    url: '/structure',
    order: 0,
    component: StructureForm,
  },
  [HOST_STEP.PrivacyType]: {
    order: 1,
    url: '/privacy-type',
    component: PrivacyTypeForm,
  },
  [HOST_STEP.Location]: {
    order: 2,
    url: '/location',
    component: LocationForm,
  },
  [HOST_STEP.FloorPlan]: {
    order: 3,
    url: '/floor-plan',
    component: FloorPlanForm,
  },
  [HOST_STEP.GuestsAmount]: {
    order: 4,
    url: '/guests-amount',
    component: GuestsAmountForm,
  },
  [HOST_STEP.Images]: {
    order: 5,
    url: '/images',
    component: ImagesForm,
  },
  [HOST_STEP.Description]: {
    order: 6,
    url: '/description',
    component: DescriptionForm,
  },
  [HOST_STEP.NeighbourhoodDescription]: {
    order: 7,
    url: '/neighbourhood-description',
    component: NeighbourhoodDescriptionForm,
  },
  [HOST_STEP.Title]: {
    order: 8,
    url: '/title',
    component: TitleForm,
  },
  [HOST_STEP.Amenities]: {
    order: 9,
    url: '/amenities',
    component: AmenitiesForm,
  },
  [HOST_STEP.Price]: {
    order: 10,
    url: '/price',
    component: PriceForm,
  },
}

type HostContextState = {
  steps: {
    [key in HOST_STEP]: StepType
  }
  currentStep: string | null
  currentStepNumber: number
  isLoading: boolean
  listingId: string | null
  onPreviousStep: () => void
  onNextStep: () => void
  updateStep: (
    step: HOST_STEP,
    stepData: UseFormReturn<StepForm>,
    onSubmitCallback: (data: z.infer<any>) => Promise<boolean>,
  ) => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

type HostContextProviderProps = PropsWithChildren<{
  currentStep: string
  listingId: string
}>

const initialData: HostContextState = {
  steps: stepMap,
  currentStep: null,
  currentStepNumber: 0,
  isLoading: false,
  listingId: null,
  onPreviousStep: () => {},
  onNextStep: () => {},
  updateStep: () => {},
  setIsLoading: () => {},
}

const HostContext = createContext<HostContextState | null>(initialData)

export function HostContextProvider({
  children,
  currentStep,
  listingId,
}: HostContextProviderProps): ReactElement {
  const [steps, setSteps] = useState<HostContextState['steps']>(stepMap)
  const [isLoadingStep, setIsLoadingStep] = useState(false)
  const router = useRouter()
  const currentStepNumber = stepMap[currentStep as HOST_STEP]?.order ?? 0

  function onPreviousStep(): void {
    if (currentStepNumber > 0) {
      const previousStepNumber = currentStepNumber - 1
      const previousStepKey =
        Object.keys(steps).find(
          (key) => steps[key as HOST_STEP].order === previousStepNumber,
        ) ?? null

      if (previousStepKey) {
        router.push(
          `/host/${listingId}/${stepMap[previousStepKey as HOST_STEP].url}`,
        )
      }
    }
  }

  // TODO: Refactor this function to be more readable and maintainable
  async function onNextStep(): Promise<void> {
    if (currentStepNumber < Object.keys(steps).length - 1) {
      const nextStepNumber = currentStepNumber + 1
      const nextStepKey =
        Object.keys(steps).find(
          (key) => steps[key as HOST_STEP].order === nextStepNumber,
        ) ?? null
      const currentStepObject = steps[currentStep as HOST_STEP]

      if (!currentStepObject) {
        return
      }

      if (currentStepObject.form) {
        const formSend = await currentStepObject.form.trigger()

        if (
          formSend &&
          currentStepObject.form.formState.isValid &&
          currentStepObject.onSubmitCallback
        ) {
          const formSubmit = await currentStepObject.onSubmitCallback(
            currentStepObject.form.getValues(),
          )

          if (formSubmit) {
            router.push(
              `/host/${listingId}/${stepMap[nextStepKey as HOST_STEP].url}`,
            )
            return
          }
        }
      }
    }

    if (
      currentStepNumber > 0 &&
      currentStepNumber === Object.keys(steps).length - 1
    ) {
      const currentStepObject = steps[currentStep as HOST_STEP]

      if (!currentStepObject) {
        return
      }

      if (currentStepObject.form) {
        const formSend = await currentStepObject.form.trigger()

        if (
          formSend &&
          currentStepObject.form.formState.isValid &&
          currentStepObject.onSubmitCallback
        ) {
          const formSubmit = await currentStepObject.onSubmitCallback(
            currentStepObject.form.getValues(),
          )

          if (formSubmit) {
            const overviewStepPath = getRoutePathByRouteName('hostListings')
            router.push(overviewStepPath)
            return
          }
        }
      }
    }
  }

  function updateStep(
    step: HOST_STEP,
    stepData: UseFormReturn<StepForm>,
    onSubmitCallback: (data: z.infer<any>) => Promise<boolean>,
  ): void {
    setSteps((prevSteps) => {
      const newSteps = { ...prevSteps }

      newSteps[step] = {
        ...newSteps[step],
        form: stepData,
        onSubmitCallback,
      }

      return newSteps
    })
  }

  return (
    <HostContext.Provider
      value={{
        steps,
        currentStep,
        currentStepNumber,
        isLoading: isLoadingStep,
        listingId,
        onPreviousStep,
        onNextStep,
        updateStep,
        setIsLoading: setIsLoadingStep,
      }}
    >
      {children}
    </HostContext.Provider>
  )
}

export function useHostContext(): HostContextState {
  const context = useContext(HostContext)

  if (!context) {
    throw new Error('useHostContext must be used within a HostContextProvider')
  }

  return context
}
