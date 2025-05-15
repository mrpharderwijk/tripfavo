import { useDialogContext } from "@/features/nav-bar/providers/dialog-context-provider";

type UseRegisterModalReturnType = {
  currentOpenDialog: string | null;
  closeDialog: () => void;
  isVisible: boolean;
  openDialog: (dialogId: string) => void;
}

export function useRegisterModal(): UseRegisterModalReturnType {
  const { currentOpenDialog, closeDialog, openDialog } = useDialogContext();

  return { 
    currentOpenDialog, 
    closeDialog: () => closeDialog('register'), 
    isVisible: currentOpenDialog === 'register', 
    openDialog
  };
}