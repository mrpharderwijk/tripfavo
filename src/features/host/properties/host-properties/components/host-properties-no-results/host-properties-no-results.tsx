'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactElement, useState } from 'react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'
import { useAppContext } from '@/providers/app-context-provider/app-context-provider'

export function HostPropertiesNoResults(): ReactElement {
  const { currentUser } = useAppContext()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const tHostProperties = useTranslations('host.properties')

  async function createProperty(): Promise<void> {
    setLoading(true)
    try {
      const response = await axios.post(
        `/api/host/${currentUser?.id}/properties`,
      )
      router.push(`/host/properties/${response.data.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FlexBox
      flex-direction="col"
      fullWidth
      align-items="center"
      justify-content="center"
    >
      <FlexBox flex-direction="col" gap={6} max-width="sm" margin-top={10}>
        <Text text-align="center" font-size="base-md">
          {tHostProperties('noResults.text')}
        </Text>

        <FlexBox
          flex-direction="row"
          align-items="center"
          justify-content="center"
        >
          <Button variant="secondary" size="lg" onClick={createProperty}>
            {tHostProperties('noResults.button')}
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
