type DialogState = {
  isUserMenuOpen: boolean
  currentOpenDialog: string | null
}

type DialogAction =
  | { type: 'TOGGLE_USER_MENU' }
  | { type: 'SET_USER_MENU_OPEN'; payload: boolean }
  | { type: 'OPEN_DIALOG'; payload: string }
  | { type: 'CLOSE_DIALOG' }

export const initialState: DialogState = {
  isUserMenuOpen: false,
  currentOpenDialog: null,
}

export function dialogReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case 'TOGGLE_USER_MENU':
      return {
        ...state,
        isUserMenuOpen: !state.isUserMenuOpen,
      }
    case 'SET_USER_MENU_OPEN':
      return {
        ...state,
        isUserMenuOpen: action.payload,
      }
    case 'OPEN_DIALOG':
      return {
        ...state,
        currentOpenDialog: action.payload,
      }
    case 'CLOSE_DIALOG':
      return {
        ...state,
        currentOpenDialog: null,
      }

    default:
      return state
  }
}
