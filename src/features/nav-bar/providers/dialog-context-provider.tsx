'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useReducer,
} from 'react'

import {
  DIALOG_TYPE,
  dialogReducer,
  initialState,
} from '@/features/nav-bar/providers/dialog-context-reducer'

type DialogContextState = {
  openDialog: (dialogId: string) => void
  closeDialog: (id: string) => void
  currentOpenDialog: string | null
}

const DialogContext = createContext<DialogContextState | null>(null)

export function DialogContextProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [state, dispatch] = useReducer(dialogReducer, initialState)

  function openDialog(dialogId: string): void {
    dispatch({ type: DIALOG_TYPE.OpenDialog, payload: dialogId ?? null })
  }

  function closeDialog(): void {
    dispatch({ type: DIALOG_TYPE.CloseDialog })
  }

  return (
    <DialogContext
      value={{
        openDialog,
        closeDialog,
        currentOpenDialog: state.currentOpenDialog,
      }}
    >
      {children}
    </DialogContext>
  )
}

export function useDialogContext(): DialogContextState {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error(
      'Must use `useDialogContext` within a `DialogContextProvider`',
    )
  }

  return context
}
