import { ComponentPropsWithoutRef, ElementType, ForwardedRef, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

export type ButtonPropsType<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  variant: 'ghost' | 'link' | 'link-btn' | 'primary' | 'secondary' | 'withIcon'
} & ComponentPropsWithoutRef<T>

const ButtonPolymorph = <T extends ElementType = 'button'>(props: ButtonPropsType<T>, ref: any) => {
  const {
    as: Component = 'button',
    children,
    className,
    disabled,
    fullWidth,
    variant = 'primary',
    ...restProps
  } = props

  const classNames = {
    btn: clsx(s.btn, s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className),
  }

  return (
    <Component className={classNames.btn} {...restProps} disabled={disabled} ref={ref}>
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType>(
  props: ButtonPropsType<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonPropsType<T>> & {
      ref?: ForwardedRef<ElementType<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
