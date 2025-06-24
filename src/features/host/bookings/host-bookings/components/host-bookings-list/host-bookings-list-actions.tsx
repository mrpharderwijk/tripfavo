'use client'

import axios from 'axios'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEvent, ReactElement } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { DropDownMenu } from '@/components/organisms/drop-down-menu/drop-down-menu'
import { DropDownMenuItem } from '@/components/organisms/drop-down-menu/drop-down-menu-item'
import { useDropDownContext } from '@/features/nav-bar/providers/drop-down-context-provider'

type HostBookingListItemActionsProps = {
  id: string
}

export function HostBookingListItemActions({
  id,
}: HostBookingListItemActionsProps): ReactElement {
  const router = useRouter()
  const { currentOpenDropDown, closeDropDown, toggleDropDown } =
    useDropDownContext()

  function handleOnClickActions(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation()
    toggleDropDown(`booking-item-actions-${id}`)
  }

  async function handleOnClickDelete(
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    e.stopPropagation()

    try {
      await axios.delete(`/api/host/bookings/${id}`)
    } catch (error) {
      console.error(error)
    } finally {
      closeDropDown(`booking-item-actions-${id}`)
      router.refresh()
    }
  }

  return (
    <div className="absolute top-0 right-0 z-20">
      <DropDownMenu
        size="sm"
        id={`booking-item-actions-${id}`}
        trigger={
          <Button
            variant="primary"
            icon={EllipsisVertical}
            size="sm"
            onClick={handleOnClickActions}
          />
        }
        isOpen={currentOpenDropDown === `booking-item-actions-${id}`}
      >
        <DropDownMenuItem label="Delete" onClick={handleOnClickDelete} />
      </DropDownMenu>
    </div>
  )
}
