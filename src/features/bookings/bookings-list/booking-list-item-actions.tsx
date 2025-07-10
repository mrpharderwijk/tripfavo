'use client'
import axios from 'axios'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEvent, ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { DropDownMenu } from '@/components/organisms/drop-down-menu/drop-down-menu'
import { DropDownMenuItem } from '@/components/organisms/drop-down-menu/drop-down-menu-item'
import { useDropDownContext } from '@/features/nav-bar/providers/drop-down-context-provider'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

type BookingListItemActionsProps = {
  id: string
}

export function BookingListItemActions({
  id,
}: BookingListItemActionsProps): ReactElement {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const { currentOpenDropDown, closeDropDown, toggleDropDown } =
    useDropDownContext()

  function handleOnClickActions(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation()
    toggleDropDown(`property-item-actions-${id}`)
  }

  async function handleOnClickDelete(
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    e.stopPropagation()

    try {
      await axios.delete(`/api/host/${currentUser?.id}/properties/${id}`)
    } catch (error) {
      console.error(error)
    } finally {
      closeDropDown(`property-item-actions-${id}`)
      router.refresh()
    }
  }

  return (
    <div className="absolute top-0 right-0 z-20">
      <DropDownMenu
        size="sm"
        id={`property-item-actions-${id}`}
        trigger={
          <Button
            variant="primary"
            icon={EllipsisVertical}
            size="sm"
            onClick={handleOnClickActions}
          />
        }
        isOpen={currentOpenDropDown === `property-item-actions-${id}`}
      >
        <DropDownMenuItem label="Delete" onClick={handleOnClickDelete} />
      </DropDownMenu>
    </div>
  )
}
