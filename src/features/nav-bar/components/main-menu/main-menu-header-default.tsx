'use client'
import { XIcon } from 'lucide-react'
import { ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { useMainMenuContext } from '@/features/nav-bar/components/main-menu/main-menu-context-provider'

export function MainMenuHeaderDefault(): ReactElement {
  const { handleMainMenuClick } = useMainMenuContext()

  return <Button icon={XIcon} size="sm" variant="quaternary" onClick={handleMainMenuClick} />
}
