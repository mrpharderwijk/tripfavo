import { Meta, StoryFn } from '@storybook/react'

import { Display } from '@/components/atoms/display/display'

export default {
  title: 'Components/Atoms/Display/Display',
  component: Display,
} as Meta

const displayVariants = [
  'show',
  'show-xs',
  'show-xs-up',
  'show-md',
  'show-md-up',
  'show-lg',
  'show-lg-up',
  'show-xl',
  'show-xl-up',
  'show-2xl',
  'show-2xl-up',
  'show-3xl',
  'show-3xl-up',
]

const OverviewTemplate: StoryFn = (args) => {
  return (
    <>
      {displayVariants.map((variant) => (
        <Display
          key={variant}
          {...args}
          show={variant === 'show'}
          show-xs={variant === 'show-xs'}
          show-xs-up={variant === 'show-xs-up'}
          show-md={variant === 'show-md'}
          show-md-up={variant === 'show-md-up'}
          show-lg={variant === 'show-lg'}
          show-lg-up={variant === 'show-lg-up'}
          show-xl={variant === 'show-xl'}
          show-xl-up={variant === 'show-xl-up'}
          show-2xl={variant === 'show-2xl'}
          show-2xl-up={variant === 'show-2xl-up'}
          show-3xl={variant === 'show-3xl'}
          show-3xl-up={variant === 'show-3xl-up'}
        >
          {args.children} on {variant}
        </Display>
      ))}
    </>
  )
}

export const Overview = OverviewTemplate.bind({})
Overview.args = {
  children: 'Displayed',
}

const Template: StoryFn = (args) => <Display {...args} />

export const ShowXs = Template.bind({})
ShowXs.args = {
  children: 'show-xs',
  'show-xs': true,
}

export const ShowXsUp = Template.bind({})
ShowXsUp.args = {
  children: 'show-xs-up',
  'show-xs': true,
  'show-md': true,
  'show-lg': true,
  'show-xl': true,
  'show-2xl': true,
  'show-3xl': true,
}

export const ShowMdUp = Template.bind({})
ShowMdUp.args = {
  children: 'show-md-up',
  'show-md': true,
  'show-lg': true,
  'show-xl': true,
  'show-2xl': true,
  'show-3xl': true,
}

export const ShowLgUp = Template.bind({})
ShowLgUp.args = {
  children: 'show-lg-up',
  'show-lg': true,
  'show-xl': true,
  'show-2xl': true,
  'show-3xl': true,
}

export const ShowXlUp = Template.bind({})
ShowXlUp.args = {
  children: 'show-xl-up',
  'show-xl': true,
  'show-2xl': true,
  'show-3xl': true,
}

export const Show2xlUp = Template.bind({})
Show2xlUp.args = {
  children: 'show-2xl-up',
  'show-2xl': true,
  'show-3xl': true,
}

export const Show3xlUp = Template.bind({})
Show3xlUp.args = {
  children: 'show-3xl-up',
  'show-3xl': true,
}
