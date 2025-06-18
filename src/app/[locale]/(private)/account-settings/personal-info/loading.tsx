import { ReactElement } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export default function Loading(): ReactElement {
  return (
    <FlexBox flex-direction="col" align-items="center" fullHeight>
      <DotLoader />
    </FlexBox>
  )
}
