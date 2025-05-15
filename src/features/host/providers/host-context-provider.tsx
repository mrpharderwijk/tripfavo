'use client'

import { useSessionStorage } from 'usehooks-ts'
import {
  ComponentType,
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react'
import { z } from 'zod'

import StructureForm, { StructureFormSchema } from '@/app/[locale]/(private)/host/components/forms/structure-form/sturcture-form'
import { UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import PrivacyTypeForm, { PrivacyTypeFormSchema } from '@/app/[locale]/(private)/host/components/forms/privacy-type-form/privacy-type-form'
import { LocationForm } from '@/app/[locale]/(private)/host/components/forms/location-form/location-form'
import { FloorPlanForm } from '@/app/[locale]/(private)/host/components/forms/floor-plan-form/floor-plan-form'

type StepForm = z.infer<typeof StructureFormSchema> | z.infer<typeof PrivacyTypeFormSchema>
type StepType = {
  url: string
  order: number
  title: string
  subtitle?: string
  form?: UseFormReturn<StepForm>
  component?: ComponentType
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
  },
  [HOST_STEP.Description]: {
    order: 5,
    url: '/description',
    title: 'Describe your place',
    subtitle: 'Add a description of your property to help guests find it.',
  },
  [HOST_STEP.Price]: {
    order: 6,
    url: '/price',
    title: 'Set your price',
    subtitle: 'Set a price for your property to help guests find it.',
  },
}

type StorageValue = {
  [key in HOST_STEP]?: z.infer<typeof StructureFormSchema> | z.infer<typeof PrivacyTypeFormSchema>
} | null

type HostContextState = {
  steps: { 
    [key in HOST_STEP]: StepType
  }
  currentStep: string | null
  currentStepNumber: number
  onPreviousStep: () => void
  onNextStep: () => void
  updateStep: (
    step: HOST_STEP,
    stepData: UseFormReturn<StepForm>,
  ) => void
  storageValue: StorageValue
  setStorageValue: (value: StorageValue) => void
  removeStorageValue: () => void
}

type HostContextProviderProps = PropsWithChildren<{
  currentStep: string
}>

const initialData: HostContextState = {
  steps: stepMap,
  currentStep: null,
  currentStepNumber: 0,
  onPreviousStep: () => {},
  onNextStep: () => {},
  updateStep: () => {},
  storageValue: null,
  setStorageValue: () => {},
  removeStorageValue: () => {},
}

const HostContext = createContext<HostContextState | null>(initialData)

export function HostContextProvider({
  children,
  currentStep,
}: HostContextProviderProps): ReactElement {
  const [value, setValue, removeValue] = useSessionStorage<StorageValue>('host-funnel', null);
  const router = useRouter()
  const [steps, setSteps] = useState<HostContextState['steps']>(stepMap)
  const currentStepNumber = stepMap[currentStep as HOST_STEP]?.order ?? 0

  function onPreviousStep(): void {
    if (currentStepNumber > 0) {
      const previousStepNumber = currentStepNumber - 1
      const previousStepKey = Object.keys(steps).find(key => steps[key as HOST_STEP].order === previousStepNumber) ?? null;

      if (previousStepKey) {
        router.push(`/host/${stepMap[previousStepKey as HOST_STEP].url}`)
      }
    }
  }

  async function onNextStep(): Promise<void> {
    if (currentStepNumber < Object.keys(steps).length - 1) {
      const nextStepNumber = currentStepNumber + 1
      const nextStepKey = Object.keys(steps).find(key => steps[key as HOST_STEP].order === nextStepNumber) ?? null;
      const currentStepObject = steps[currentStep as HOST_STEP]

      console.log('currentStepObject: ', currentStepObject)
      if (!currentStepObject) {
        return
      }

      if (currentStepObject.form) {
        console.log('currentStepObject.form: ', currentStepObject.form.getValues())
        setValue({
          ...(value ?? {}),
          [currentStep as HOST_STEP]: currentStepObject.form.getValues()
        })
        const formSend = await currentStepObject.form.trigger()
        if (formSend && currentStepObject.form.formState.isValid) {
          router.push(`/host/${stepMap[nextStepKey as HOST_STEP].url}`)
        }
      }
    }
  }

  function updateStep(
    step: HOST_STEP,
    stepData: UseFormReturn<StepForm>,
  ): void {
    setSteps((prevSteps) => {
      const newSteps = { ...prevSteps }
      newSteps[step] = {
        ...newSteps[step],
        form: stepData,
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
        onPreviousStep, 
        onNextStep, 
        updateStep, 
        storageValue: value,
        setStorageValue: setValue,
        removeStorageValue: removeValue
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
