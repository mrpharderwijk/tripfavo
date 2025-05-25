import { PropsWithChildren, ReactElement } from 'react'

import { ButtonContent, ButtonContentProps } from '../components/button-content/button-content'

type ButtonWrapperProps = PropsWithChildren<
  {
    renderRoot: (buttonContent: ReactElement) => ReactElement
  } & ButtonContentProps
>

export function ButtonWrapper({ renderRoot, ...rest }: ButtonWrapperProps): ReactElement {
  return renderRoot(<ButtonContent {...rest} />)
}
