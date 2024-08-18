import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta = {
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'inline-radio-button' },
      options: ['primary', 'secondary', 'ghost', 'link', 'link-btn'],
    },
  },
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=303-3570&mode=dev',
    },
  },
  tags: ['autodocs'],
  title: 'UI Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary button',
    disabled: false,
    variant: 'primary',
  },
}
export const Secondary: Story = {
  args: {
    children: 'Secondary button',
    disabled: false,
    variant: 'secondary',
  },
}
export const Ghost: Story = {
  args: {
    children: 'Ghost button',
    disabled: false,
    variant: 'ghost',
  },
}
export const FullWidth: Story = {
  args: {
    children: 'Full width button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link as a button',
    href: '',
    variant: 'link',
  },
}

export const LinkAsButton: Story = {
  args: {
    as: 'a',
    children: 'Button as link',
    href: '',
    variant: 'link-btn',
  },
}
