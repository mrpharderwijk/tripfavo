'use client';

import { ReactElement } from "react";

type UserMenuItemProps = {
  label: string;
  onClick: () => void;
}

export function UserMenuItem({ label, onClick }: UserMenuItemProps): ReactElement {
  return (
    <button onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-left">
      {label}
    </button>
  )
}