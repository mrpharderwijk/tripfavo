type DialogState = {
  currentOpenDialog: string | null
}
export const enum DIALOG_TYPE {
  OpenDialog = 'OPEN_DIALOG',
  CloseDialog = 'CLOSE_DIALOG',
}
type DialogAction =
  | { type: DIALOG_TYPE.OpenDialog; payload: string }
  | { type: DIALOG_TYPE.CloseDialog }

export const initialState: DialogState = {
  currentOpenDialog: null,
}

export function dialogReducer(
  state: DialogState,
  action: DialogAction,
): DialogState {
  switch (action.type) {
    case DIALOG_TYPE.OpenDialog:
      return {
        ...state,
        currentOpenDialog: action.payload,
      }
    case DIALOG_TYPE.CloseDialog:
      return {
        ...state,
        currentOpenDialog: null,
      }

    default:
      return state
  }
}
