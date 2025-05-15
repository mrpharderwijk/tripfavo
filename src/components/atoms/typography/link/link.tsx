import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement, Ref } from 'react'
import { HtmlHTMLAttributes } from 'react'

import { textClassNames } from '@/components/atoms/typography/text/text.class-names'

type LinkProps = PropsWithChildren<
  VariantProps<typeof textClassNames> &
    Omit<HtmlHTMLAttributes<HTMLAnchorElement>, 'className'> & {
      ref?: Ref<HTMLAnchorElement>
    }
>

export function Link({ children, ref, ...props }: LinkProps): ReactElement {
  const anchorClassName = textClassNames({ ...props })

  return (
    <a ref={ref} {...props} className={anchorClassName}>
      {children}
    </a>
  )
}
