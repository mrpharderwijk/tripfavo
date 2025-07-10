'use client'

import { ReactElement } from 'react'

import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'
import { WithRef } from '@/types/with-ref'

type MainMenuContainerProps = WithRef<HTMLDivElement>

export function MainMenuContainer({
  ref,
}: MainMenuContainerProps): ReactElement {
  const { header, body, footer } = useMainMenuContext()

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-screen h-svh bg-grey-1000/40 z-50 p-4 flex flex-row items-start justify-end">
      <div
        ref={ref}
        className="relative flex flex-col w-full md:w-96 max-h-full bg-bg-primary rounded-2xl pb-4 gap-4"
      >
        {/* Header */}
        {!!header && (
          <header className="flex flex-row items-start justify-between pt-2 px-4 flex-initial">
            <div className="min-h-10">{header}</div>
          </header>
        )}

        {/* Body */}
        <div className="flex flex-col px-4 flex-auto">
          <div className="flex flex-col gap-4">{body}</div>
        </div>

        {/* Footer */}
        {!!footer && (
          <footer className="flex flex-row gap-4 px-4 flex-initial">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}
