import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from './index'

const meta = {
  component: TextArea,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=316-8163&mode=dev',
    },
  },
  tags: ['autodocs'],
  title: 'UI Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
  },
}

export const Error: Story = {
  args: {
    error: 'Some error!',
    label: 'Some label',
    value: 'Error text',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Some label',
    placeholder: 'Placeholder text',
  },
}
