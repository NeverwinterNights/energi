import { CSSProperties, ElementRef, ReactElement, forwardRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

import { ArrowDownIcon } from '../../assets'
import { Typography } from '../typography'
import { SelectContent } from './select-content/select-content'

export type Option = { label: ReactElement | string; value: string }

type ConditionalMultipleProps = {
  multiple?: true
  onChange: (value: any) => void
  value?: ReactElement | string
}

type CommonProps = {
  className?: string
  disabled?: boolean
  errorMessage?: string
  label?: string
  name?: string
  onBlur?: () => void
  options: Option[]
  placeholder?: ReactElement | string
  portal?: boolean
  required?: boolean
  rootClassName?: string
  secondary?: boolean
  variant?: 'pagination' | 'primary'
  width?: CSSProperties['width']
}
export type SelectProps = CommonProps & ConditionalMultipleProps

export const Select = forwardRef<ElementRef<typeof SelectRadix.Root>, SelectProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      label,
      onBlur,
      onChange,
      options,
      placeholder,
      portal = true,
      rootClassName,
      secondary,
      value,
      variant = 'primary',
      width,
    },
    ref
  ) => {
    const showError = !!errorMessage && errorMessage.length > 0
    const classNames = {
      icon: clsx(s.icon, s[variant]),
      label: clsx(s.label, disabled && s.disabled),
      root: rootClassName,
      trigger: clsx(
        s.trigger,
        s[variant],
        showError && s.error,
        secondary && s.secondary,
        className
      ),
    }
    const withoutPlaceholder = variant === 'pagination' ? value : placeholder
    const rootStyles = { width }

    return (
      <div className={classNames.root}>
        {label && (
          <Typography
            asComponent={'label'}
            className={classNames.label}
            variant={'regular_text_16'}
          >
            {label}
          </Typography>
        )}
        <SelectRadix.Root disabled={disabled} onValueChange={onChange} value={value as any}>
          <SelectRadix.Trigger
            className={classNames.trigger}
            onBlur={onBlur}
            ref={ref}
            style={rootStyles}
          >
            <SelectRadix.Value placeholder={placeholder || withoutPlaceholder}>
              {value}
            </SelectRadix.Value>
            <SelectRadix.Icon className={classNames.icon}>
              <ArrowDownIcon size={variant === 'pagination' ? 16 : 24} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          {portal ? (
            <SelectRadix.Portal>
              <SelectContent options={options} variant={variant} />
            </SelectRadix.Portal>
          ) : (
            <SelectContent options={options} variant={variant} />
          )}
          <div className={s.errorContainer}>
            {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
          </div>
        </SelectRadix.Root>
      </div>
    )
  }
)
