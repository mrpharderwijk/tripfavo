import { PropsWithChildren } from 'react'

import { HostFooter } from '@/features/host/components/host-footer/host-footer'
import { HostContextProvider } from '@/features/host/providers/host-context-provider'

export default async function HostStepLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string; stepId: string }> }>) {
  const { locale, stepId } = await params

  return (
    <HostContextProvider currentStep={stepId}>
      {children}
      <HostFooter />
    </HostContextProvider>
  )
}
