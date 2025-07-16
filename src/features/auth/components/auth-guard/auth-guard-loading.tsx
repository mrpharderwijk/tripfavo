import { ReactElement } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'

export function AuthGuardLoading(): ReactElement {
  return (
    <FlexBox
      flex-direction="col"
      align-items="center"
      justify-content="center"
      min-height="full"
      gap={4}
    >
      <DotLoader />
      <p className="text-sm text-gray-600">Checking authentication...</p>
    </FlexBox>
  )
}
