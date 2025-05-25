type PersonalInfoState = {
  currentEditMode: string | null
}
export const enum PERSONAL_INFO_TYPE {
  EnableEditMode = 'ENABLE_EDIT_MODE',
  DisableEditMode = 'DISABLE_EDIT_MODE',
}
type PersonalInfoAction =
  | { type: PERSONAL_INFO_TYPE.EnableEditMode; payload: string }
  | { type: PERSONAL_INFO_TYPE.DisableEditMode }

export const initialState: PersonalInfoState = {
  currentEditMode: null,
}

export function personalInfoReducer(
  state: PersonalInfoState,
  action: PersonalInfoAction,
): PersonalInfoState {
  switch (action.type) {
    case PERSONAL_INFO_TYPE.EnableEditMode:
      return {
        ...state,
        currentEditMode: action.payload,
      }
    case PERSONAL_INFO_TYPE.DisableEditMode:
      return {
        ...state,
        currentEditMode: null,
      }

    default:
      return state
  }
}
