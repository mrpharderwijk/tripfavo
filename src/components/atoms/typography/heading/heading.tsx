import { HTMLAttributes, PropsWithChildren, ReactElement } from 'react'

import { Text, TextProps } from '@/components/atoms/typography/text/text'
import { PropsWithTestId } from '@/types'

type LikeEnum = [
  'h1-semibold',
  'h2-semibold',
  'h2-base',
  'h3',
  'h3-base',
  'h3-semibold',
  'h3-medium',
  'h4',
  'h4-base',
  'h4-semibold',
  'h4-medium',
  'h5',
  'h5-semibold',
  'h5-medium',
  'h6',
  'h6-semibold',
]
type Like = LikeEnum[number]
type HeadingElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = PropsWithChildren<
  PropsWithTestId<
    {
      tag?: HeadingElementTag
      like?: Like
    } & HTMLAttributes<HTMLHeadingElement> &
      TextProps
  >
>

const headingTextPropsMap = {
  'h1-semibold': {
    'font-size': 'titles-2xl-semibold',
  },
  'h2-base': {
    'font-size': 'base-xlt',
  },
  'h2-semibold': {
    'font-size': 'titles-xl-semibold',
  },
  h3: {
    'font-size': 'title-lg',
  },
  'h3-base': {
    'font-size': 'base-lgt',
  },
  'h3-semibold': {
    'font-size': 'titles-lg-semibold',
  },
  'h3-medium': {
    'font-size': 'titles-lg-medium',
  },
  h4: {
    'font-size': 'title-md',
  },
  'h4-base': {
    'font-size': 'base-mdt',
  },
  'h4-semibold': {
    'font-size': 'titles-md-semibold',
  },
  'h4-medium': {
    'font-size': 'titles-md-medium',
  },
  h5: {
    'font-size': 'title-sm',
  },
  'h5-semibold': {
    'font-size': 'titles-sm-semibold',
  },
  'h5-medium': {
    'font-size': 'titles-sm-medium',
  },
  h6: {
    'font-size': 'title-xs',
  },
  'h6-semibold': {
    'font-size': 'titles-xs-semibold',
  },
}

export function Heading({
  children,
  like,
  tag = 'h1',
  ...headingProps
}: HeadingProps): ReactElement {
  const textProps = {
    tag,
    ...(!!like && (headingTextPropsMap[like] as TextProps)),
    ...headingProps,
  }

  return <Text {...textProps}>{children}</Text>
}
