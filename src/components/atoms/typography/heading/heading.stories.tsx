import { Meta, type StoryObj } from '@storybook/react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item'
import {
  Heading,
  type HeadingProps,
} from '@/components/atoms/typography/heading/heading'

export default {
  title: 'Components/Atoms/Typography/Heading',
  component: Heading,
} as Meta<typeof Heading>

type Story = StoryObj<typeof Heading>

const defaultText = 'The quick brown fox jumps over the lazy dog'

export const Overview: Story = {
  render: () => {
    const headingsArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

    return (
      <FlexBox flex-direction="col">
        <FlexBoxItem>
          {headingsArray.map((heading, index) => (
            <Heading key={index} tag={heading as HeadingProps['tag']}>
              {defaultText}
            </Heading>
          ))}
        </FlexBoxItem>
      </FlexBox>
    )
  },
}

export const H1: Story = {
  args: {
    children: defaultText,
  },
  parameters: {
    source: `
<Heading>${defaultText}</Heading>
// or
<Heading as='h1'>${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
}

export const H2: Story = {
  args: {
    tag: 'h2',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h2">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
}

export const H3: Story = {
  args: {
    tag: 'h3',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h3">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
}

export const H4: Story = {
  args: {
    tag: 'h4',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h4">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
}

export const H5: Story = {
  args: {
    tag: 'h5',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h5">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
}

export const H6: Story = {
  args: {
    tag: 'h6',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h6">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
}
