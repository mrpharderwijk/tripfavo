'use client'

import { Send } from 'lucide-react'
import { ReactElement } from 'react'

import { TextArea } from '@/components/atoms/forms/text-area/text-area'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Button } from '@/components/molecules/buttons/button'

export function HostBookingDetailChatPane(): ReactElement {
  return (
    <FlexBox flex-direction="col" fullWidth fullHeight>
      {/* Chat messages */}
      <FlexBoxItem flex="auto" flex-direction="col" fullWidth fullHeight>
        <FlexBox bg-color="quaternary" fullHeight>
          Chat messages
        </FlexBox>
      </FlexBoxItem>

      {/* Chat input */}
      <FlexBoxItem
        flex-direction="row"
        justify-content="center"
        flex="initial"
        padding-y={4}
        padding-x={4}
        gap={2}
      >
        <FlexBoxItem flex="auto">
          <TextArea
            rows={1}
            placeholder="Type your message here..."
            id="message"
            label="Message"
          />
        </FlexBoxItem>
        <FlexBoxItem flex="initial">
          <Button
            icon={Send}
            size="lg"
            variant="secondary"
            onClick={() => {}}
          />
        </FlexBoxItem>
      </FlexBoxItem>
    </FlexBox>
  )
}
