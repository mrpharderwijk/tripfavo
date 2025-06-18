export type ActionError = {
  error: string
}

export type ServerActionResponse<T = {}> =
  | ActionError
  | undefined
  | { data: T | null }

export function isActionError(error: any): error is ActionError {
  return error && 'error' in error && error.error
}
