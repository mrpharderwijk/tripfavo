import { ReactElement } from 'react'

import { Input, InputProps } from '@/components/atoms/forms/input/input'

type InputEmailProps = InputProps

export function InputEmail({ ...props }: InputEmailProps): ReactElement {
  return <Input {...props} type="email" autoComplete="email" />
}
