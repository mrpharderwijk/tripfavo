import { useDialogContext } from "@/features/nav-bar/providers/dialog-context-provider";

type UseRentModalReturnType = {
  currentOpenDialog: string | null;
  closeDialog: () => void;
  isVisible: boolean;
  openDialog: (dialogId: string) => void;
}

export function useRentModal(): UseRentModalReturnType {
  const { currentOpenDialog, closeDialog, openDialog } = useDialogContext();

  return { 
    currentOpenDialog, 
    closeDialog: () => closeDialog('rent'), 
    isVisible: currentOpenDialog === 'rent', 
    openDialog
  };
}