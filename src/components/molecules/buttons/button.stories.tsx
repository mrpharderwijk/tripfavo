import { AlignJustify } from 'lucide-react'
import { Meta, StoryFn } from '@storybook/react'

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { Button } from '@/components/molecules/buttons/button'
import { ButtonProps } from '@/components/molecules/buttons/button'
import { buttonVariants } from '@/components/molecules/buttons/button.class-names'

export default {
  title: 'Components/Molecules/Buttons/Button',
  component: Button,
} as Meta
const sizePixels = ['24px', '34px', '40px', '48px', '56px']
const sizeVariants = ['xs', 'sm', 'md', 'lg', 'xl']

const OverviewTemplate: StoryFn = (args) => {
  return (
    <FlexBox flex-direction="col" gap={4}>
      <FlexBox flex-direction="row" gap={2}>
        {sizePixels.map((sizePixel) => (
          <Body key={sizePixel}>{sizePixel}</Body>
        ))}
      </FlexBox>

      {args.buttonVariants.map((variant: string) => (
        <FlexBox key={variant} flex-direction="col" gap={2}>
          <Heading tag="h1" like="h1-semibold">
            {variant}
          </Heading>
          <FlexBox
            flex-direction="row"
            align-items="center"
            justify-content="start"
            gap={2}
            key={variant}
          >
            {sizeVariants.map((size) => {
              return (
                <Button
                  data-testid={`button-${size}-${variant}`}
                  key={size}
                  variant={variant as ButtonProps['variant']}
                  size={size as ButtonProps['size']}
                  {...args}
                />
              )
            })}
          </FlexBox>
        </FlexBox>
      ))}
    </FlexBox>
  )
}

export const Overview = OverviewTemplate.bind({})
Overview.args = {
  children: 'Button',
  buttonVariants,
}

export const WithRounded = OverviewTemplate.bind({})
WithRounded.args = {
  children: 'Button',
  rounded: true,
  buttonVariants,
}

export const WithIconOnly = OverviewTemplate.bind({})
WithIconOnly.args = {
  noPrimaryLink: true,
  iconOnly: true,
  icon: AlignJustify,
  buttonVariants: buttonVariants.filter(
    (variant) => variant !== 'primary-link',
  ),
}

export const WithAvatar = OverviewTemplate.bind({})
WithAvatar.args = {
  avatar: true,
  buttonVariants: ['primary'],
}

const FullWidthTemplate: StoryFn = (args: ButtonProps) => {
  return (
    <FlexBox flex-direction="col" gap={4}>
      {buttonVariants.map((variant) => {
        return (
          <FlexBox key={variant} flex-direction="col" gap={2}>
            <Heading tag="h1" like="h1-semibold">
              {variant}
            </Heading>
            <FlexBox
              flex-direction="col"
              align-items="center"
              justify-content="start"
              gap={2}
              key={variant}
            >
              {sizeVariants.map((size) => {
                return (
                  <>
                    {/* <Heading as="h2" like="h2">
                      {size}
                    </Heading> */}
                    <Button
                      key={size}
                      variant={variant as ButtonProps['variant']}
                      size={size as ButtonProps['size']}
                      {...args}
                    />
                  </>
                )
              })}
            </FlexBox>
          </FlexBox>
        )
      })}
    </FlexBox>
  )
}

export const WithFullWidth = FullWidthTemplate.bind({})
WithFullWidth.args = {
  children: 'Button',
  fullWidth: true,
}

const Template: StoryFn = (args: ButtonProps) => <Button {...args} />

export const Avatar = Template.bind({})
Avatar.args = {
  avatar: true,
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
  variant: 'primary',
}

export const PrimaryInverse = Template.bind({})
PrimaryInverse.args = {
  children: 'Button',
  variant: 'primary-inverse',
}

export const PrimaryLink = Template.bind({})
PrimaryLink.args = {
  children: 'Button',
  variant: 'primary-link',
  size: '3xs',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button',
  variant: 'secondary',
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  children: 'Button',
  variant: 'tertiary',
}

export const Quaternary = Template.bind({})
Quaternary.args = {
  children: 'Button',
  variant: 'quaternary',
}
