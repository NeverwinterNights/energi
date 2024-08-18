import { useState } from 'react'

import { SelectProps } from '@radix-ui/react-select'
import { Meta } from '@storybook/react'

import { Select } from './index'

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=376-8933&mode=dev',
    },
  },
  tags: ['autodocs'],
  title: 'UI Components/Select',
}

export default meta

const optionsPrimary = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Banana',
    value: 'Banana',
  },
  {
    label: 'Blueberry',
    value: 'Blueberry',
  },
  {
    label: 'Grapes',
    value: 'Grapes',
  },
]
const optionsPagination = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
]

export const Simple = {
  args: {
    options: optionsPrimary,
  },

  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return (
      <Select
        options={optionsPrimary}
        placeholder={'Select Box'}
        {...args}
        onChange={setValue}
        value={value}
      />
    )
  },
}

export const SimpleWithLabel = {
  args: {
    label: 'Select',
    // placeholder: 'select...',
    options: optionsPrimary,
  },

  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return (
      <Select
        options={optionsPrimary}
        placeholder={'Select Box'}
        {...args}
        onChange={setValue}
        value={value}
      />
    )
  },
}

export const Error = {
  args: {
    errorMessage: 'error',
    label: 'Select',
    options: optionsPrimary,
    placeholder: 'select...',
  },

  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return (
      <Select
        options={optionsPrimary}
        placeholder={'Select Box'}
        {...args}
        onChange={setValue}
        value={value}
      />
    )
  },
}
export const Pagination = {
  args: {
    label: 'pagination',
    options: optionsPagination,
    placeholder: '1',
    variant: 'pagination',
  },

  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return (
      <Select
        options={optionsPagination}
        placeholder={'Select Box'}
        {...args}
        onChange={setValue}
        value={value}
      />
    )
  },
}

export const FullWidth = {
  args: {
    options: optionsPrimary,
    variant: 'primary',
    width: '100%',
  },

  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return (
      <Select
        options={optionsPrimary}
        placeholder={'Select Box'}
        {...args}
        onChange={setValue}
        value={value}
      />
    )
  },
}
