type DropDownState = {
  currentOpenDropDown: string | null
}
export const enum DROP_DOWN_TYPE {
  OpenDropDown = 'OPEN_DROP_DOWN',
  CloseDropDown = 'CLOSE_DROP_DOWN',
  CloseAllDropDown = 'CLOSE_ALL_DROP_DOWN',
}
type DropDownAction =
  | { type: DROP_DOWN_TYPE.OpenDropDown; payload: string }
  | { type: DROP_DOWN_TYPE.CloseDropDown; payload: string }
  | { type: DROP_DOWN_TYPE.CloseAllDropDown }

export const initialState: DropDownState = {
  currentOpenDropDown: null,
}

export function dropDownReducer(
  state: DropDownState,
  action: DropDownAction,
): DropDownState {
  switch (action.type) {
    case DROP_DOWN_TYPE.OpenDropDown:
      return {
        ...state,
        currentOpenDropDown: action.payload,
      }
    case DROP_DOWN_TYPE.CloseDropDown:
      return {
        ...state,
        currentOpenDropDown:
          action.payload === state.currentOpenDropDown
            ? null
            : state.currentOpenDropDown,
      }

    case DROP_DOWN_TYPE.CloseAllDropDown:
      return {
        ...state,
        currentOpenDropDown: null,
      }

    default:
      return state
  }
}
