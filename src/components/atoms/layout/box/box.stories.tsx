import { Meta, StoryObj } from '@storybook/react'

import { Box } from './box'

import { BorderBox } from '@/storybook/components/border-box'
import { MarginBox } from '@/storybook/components/margin-box'
import { PaddingBox } from '@/storybook/components/padding-box'
import { Rectangle } from '@/storybook/components/rectangle'

export default {
  title: 'Components/Atoms/Layout/Box',
  component: Box,
} as Meta<typeof Box>

type Story = StoryObj<typeof Box>

export const Margin: Story = {
  render: () => (
    <MarginBox position="relative" float="left" bg-color="yellow-100">
      <Box tag="aside" margin={4} position="relative">
        <BorderBox z-index={30} />
        <Rectangle position="absolute" spread z-index={10} />
        <span className="z-10 relative">Hello, World!</span>
      </Box>
    </MarginBox>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Box tag="aside" margin={4} position="relative">
  Hello World!
</Box>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
}

export const Padding: Story = {
  args: {
    // Add default props here
    tag: 'section',
    padding: 4,
    children: (
      <>
        <PaddingBox />
        <Rectangle>
          <span className="relative">Hello, World!</span>
        </Rectangle>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Box tag="section" padding={4}>
  Hello World!
</Box>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
}
