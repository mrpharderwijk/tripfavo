'use client'

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
import { z } from 'zod'

import { StructureForm, StructureFormSchema } from '@/features/host/components/forms/structure-form/sturcture-form'
import { UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PrivacyTypeForm, PrivacyTypeFormSchema } from '@/features/host/components/forms/privacy-type-form/privacy-type-form'
import { LocationForm, LocationFormSchema } from '@/features/host/components/forms/location-form/location-form'
import { FloorPlanForm, FloorPlanFormSchema } from '@/features/host/components/forms/floor-plan-form/floor-plan-form'
import { ImagesForm, ImagesFormSchema } from '@/features/host/components/forms/images-form/images-form'
import { DescriptionForm } from '@/features/host/components/forms/description-form/description-form'
import { ListingFull } from '@/actions/get-listing-by-logged-in-user'
import { ComponentStepProps } from '@/features/host/types/component-step-props'

type StepForm = z.infer<typeof StructureFormSchema> | z.infer<typeof PrivacyTypeFormSchema> | z.infer<typeof LocationFormSchema> | z.infer<typeof FloorPlanFormSchema> | z.infer<typeof ImagesFormSchema>
type StepType = {
  url: string
  order: number
  title: string
  subtitle?: string
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
  Price = 'price',
}

export const stepMap = {
  [HOST_STEP.Structure]: {
    url: '/structure',
    order: 0,
    title: 'Which of these best describes your place?',
    component: StructureForm,
  },
  [HOST_STEP.PrivacyType]: {
    order: 1,
    url: '/privacy-type',
    title: 'What type of place will guests have?',
    component: PrivacyTypeForm,
  },
  [HOST_STEP.Location]: {
    order: 2,
    url: '/location',
    title: "Where's your place located?",
    subtitle: "Your address is only shared with guests after they've made a reservation.",
    component: LocationForm,
  },
  [HOST_STEP.FloorPlan]: {
    order: 3,
    url: '/floor-plan',
    title: 'Share some basics about your place',
    subtitle: "You'll add more details later, like bed types.",
    component: FloorPlanForm,
  },
  [HOST_STEP.Images]: {
    order: 4,
    url: '/images',
    title: 'Add images',
    subtitle: 'Add images to your property to help guests find it.',
    component: ImagesForm,
  },
  [HOST_STEP.Description]: {
    order: 5,
    url: '/description',
    title: 'Describe your place',
    subtitle: 'Add a description of your property to help guests find it.',
    component: DescriptionForm,
  },
  [HOST_STEP.Price]: {
    order: 6,
    url: '/price',
    title: 'Set your price',
    subtitle: 'Set a price for your property to help guests find it.',
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
    onSubmitCallback: (data: z.infer<any>) => Promise<boolean>
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
      const previousStepKey = Object.keys(steps).find(key => steps[key as HOST_STEP].order === previousStepNumber) ?? null;

      if (previousStepKey) {
        router.push(`/host/${listingId}/${stepMap[previousStepKey as HOST_STEP].url}`)
      }
    }
  }

  async function onNextStep(): Promise<void> {
    if (currentStepNumber < Object.keys(steps).length - 1) {
      const nextStepNumber = currentStepNumber + 1
      const nextStepKey = Object.keys(steps).find(key => steps[key as HOST_STEP].order === nextStepNumber) ?? null;
      const currentStepObject = steps[currentStep as HOST_STEP]

      if (!currentStepObject) {
        return
      }

      if (currentStepObject.form) {
        const formSend = await currentStepObject.form.trigger()
    
        if (formSend && currentStepObject.form.formState.isValid && currentStepObject.onSubmitCallback) {
          const formSubmit = await currentStepObject.onSubmitCallback(currentStepObject.form.getValues())
          if (formSubmit) {
            router.push(`/host/${listingId}/${stepMap[nextStepKey as HOST_STEP].url}`)
          }
        }
      }
    }
  }

  function updateStep(
    step: HOST_STEP,
    stepData: UseFormReturn<StepForm>,
    onSubmitCallback: (data: z.infer<any>) => Promise<boolean>
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
