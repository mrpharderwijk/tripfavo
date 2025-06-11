'use client'
import axios from 'axios'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

import { Button } from '@/components/molecules/buttons/button'
import { DropDownMenu } from '@/components/organisms/drop-down-menu/drop-down-menu'
import { DropDownMenuItem } from '@/components/organisms/drop-down-menu/drop-down-menu-item'
import { useDropDownContext } from '@/features/nav-bar/providers/drop-down-context-provider'

type ReservationItemActionsProps = {
  id: string
}

export function ReservationItemActions({ id }: ReservationItemActionsProps) {
  const router = useRouter()
  const { currentOpenDropDown, closeDropDown, toggleDropDown } = useDropDownContext()

  function handleOnClickActions(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    toggleDropDown(`listing-item-actions-${id}`)
  }

  async function handleOnClickDelete(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    try {
      await axios.delete(`/api/host/listings/${id}`)
    } catch (error) {
      console.error(error)
    } finally {
      closeDropDown(`listing-item-actions-${id}`)
      router.refresh()
    }
  }

  return (
    <div className="absolute top-0 right-0 z-20">
      <DropDownMenu
        size="sm"
        id={`listing-item-actions-${id}`}
        trigger={
          <Button
            variant="primary"
            icon={EllipsisVertical}
            size="sm"
            onClick={handleOnClickActions}
          />
        }
        isOpen={currentOpenDropDown === `listing-item-actions-${id}`}
      >
        <DropDownMenuItem label="Delete" onClick={handleOnClickDelete} />
      </DropDownMenu>
    </div>
  )
}
