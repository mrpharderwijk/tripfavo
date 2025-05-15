import { useDialogContext } from "@/features/nav-bar/providers/dialog-context-provider";

type UseLoginModalReturnType = {
  currentOpenDialog: string | null;
  closeDialog: () => void;
  isVisible: boolean;
  openDialog: (dialogId: string) => void;
}

export function useLoginModal(): UseLoginModalReturnType {
  const { currentOpenDialog, closeDialog, openDialog } = useDialogContext();

  return { 
    currentOpenDialog, 
    closeDialog: () => closeDialog('login'), 
    isVisible: currentOpenDialog === 'login', 
    openDialog
  };
}