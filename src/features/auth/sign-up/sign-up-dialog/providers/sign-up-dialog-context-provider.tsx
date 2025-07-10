'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react'

type SignUpDialogContextType = {
  signUpSuccess: boolean
  setSignUpSuccess: (signUpSuccess: boolean) => void
}

const SignUpDialogContext = createContext<SignUpDialogContextType | null>(null)

export function SignUpDialogContextProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  return (
    <SignUpDialogContext.Provider value={{ signUpSuccess, setSignUpSuccess }}>
      {children}
    </SignUpDialogContext.Provider>
  )
}

export function useSignUpDialogContext(): SignUpDialogContextType {
  const context = useContext(SignUpDialogContext)

  if (!context) {
    throw new Error(
      'useSignUpDialogContext must be used within a SignUpDialogContextProvider',
    )
  }

  return context
}
