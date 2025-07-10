import { ReactElement, Suspense } from 'react'

import { DotLoader } from '@/components/atoms/dot-loader/dot-loader'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { PropertiesList } from '@/features/properties/components/properties-list/properties-list'
import { getPublishedProperties } from '@/features/properties/server/actions/get-properties'
import { isActionError } from '@/server/utils/error'

export default async function Home(): Promise<ReactElement> {
  const propertiesResponse = await getPublishedProperties()
  const properties = isActionError(propertiesResponse)
    ? []
    : (propertiesResponse?.data ?? [])

  return (
    <FlexBox
      flex-direction="row"
      align-items="start"
      justify-content="start"
      flex-wrap="wrap"
      gap={6}
      fullHeight
    >
      <Suspense
        fallback={
          <Grid place-items="center" fullWidth fullHeight>
            <DotLoader size="lg" />
          </Grid>
        }
      >
        <PropertiesList properties={properties} />
      </Suspense>
    </FlexBox>
  )
}
