import { dialogReducer, initialState } from "@/features/nav-bar/providers/dialog-context-reducer";
import { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useReducer } from "react";

type DialogContextState = {
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (value: boolean) => void;
  toggleUserMenu: () => void;
  openDialog: (dialogId: string) => void;
  closeDialog: (id: string) => void;
  currentOpenDialog: string | null;
}

const DialogContext = createContext<DialogContextState | null>(null);

export function DialogContextProvider({ children }: PropsWithChildren): ReactElement {
  const [state, dispatch] = useReducer(dialogReducer, initialState);

  function setIsUserMenuOpen(value: boolean): void {
    if (state.isUserMenuOpen === value) {
      return;
    }
    dispatch({ type: "SET_USER_MENU_OPEN", payload: value });
  }

  const toggleUserMenu = useCallback(() => {
    dispatch({ type: "TOGGLE_USER_MENU" });
  }, [dispatch]);

  function openDialog(dialogId: string): void {
    dispatch({ type: "OPEN_DIALOG", payload: dialogId ?? null });
  }

  function closeDialog(): void {
    dispatch({ type: "CLOSE_DIALOG" });
  }

  return (
    <DialogContext 
      value={{
        isUserMenuOpen: state.isUserMenuOpen,
        setIsUserMenuOpen,
        toggleUserMenu,
        openDialog,
        closeDialog,
        currentOpenDialog: state.currentOpenDialog,
      }}
    >
      {children}
    </DialogContext>
  );
}

export function useDialogContext(): DialogContextState {
  const context = useContext(DialogContext);
  
  if (!context) {
    throw new Error("Must use `useDialogContext` within a `DialogContextProvider`");
  }

  return context;
}