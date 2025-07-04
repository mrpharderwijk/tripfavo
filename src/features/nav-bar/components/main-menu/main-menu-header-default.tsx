'use client'
import { XIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'

export function MainMenuHeaderDefault(): ReactElement {
  const { closeMainMenu } = useMainMenuContext()

  return (
    <div className="absolute left-4 top-4">
      <Button
        icon={XIcon}
        size="sm"
        variant="quaternary"
        onClick={closeMainMenu}
      />
    </div>
  )
}
