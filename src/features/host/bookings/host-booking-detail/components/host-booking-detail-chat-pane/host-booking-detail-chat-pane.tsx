'use client'

import { Send } from 'lucide-react'
import { type KeyboardEvent, ReactElement, useState } from 'react'

import { TextArea } from '@/components/atoms/forms/text-area/text-area'
import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import { Text } from '@/components/atoms/typography/text/text'
import { Button } from '@/components/molecules/buttons/button'

interface Message {
  id: string
  text: string
  timestamp: Date
  isUser: boolean
}

export function HostBookingDetailChatPane(): ReactElement {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  function handleSendMessage(): void {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        timestamp: new Date(),
        isUser: true,
      }

      setMessages((prev) => [...prev, newMessage])
      setInputValue('')
    }
  }

  function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <FlexBox flex-direction="col" fullWidth fullHeight>
      {/* Chat messages */}
      <FlexBoxItem flex="auto" flex-direction="col" fullWidth fullHeight>
        <FlexBox
          bg-color="quaternary"
          fullHeight
          flex-direction="col"
          padding={4}
          gap={3}
        >
          {messages.length === 0 ? (
            <FlexBox justify-content="center" align-items="center" fullHeight>
              <span className="text-gray-500">
                No messages yet. Start a conversation!
              </span>
            </FlexBox>
          ) : (
            messages.map((message) => (
              <FlexBoxItem
                key={message.id}
                fullWidth
                flex-direction="row"
                justify-content={message.isUser ? 'end' : 'start'}
              >
                <FlexBox
                  bg-color={message.isUser ? 'primary' : 'secondary'}
                  padding={3}
                  border-radius="lg"
                  max-width="2xl"
                  flex-direction="col"
                >
                  <Text text-color="black">{message.text}</Text>
                  <Text
                    text-color="gray-700"
                    font-size="base-xs"
                    text-align="right"
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </FlexBox>
              </FlexBoxItem>
            ))
          )}
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </FlexBoxItem>
        <FlexBoxItem flex="initial">
          <Button
            icon={Send}
            size="lg"
            variant="secondary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          />
        </FlexBoxItem>
      </FlexBoxItem>
    </FlexBox>
  )
}
