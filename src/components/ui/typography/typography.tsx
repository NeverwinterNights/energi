import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

type TypographyProps<T extends ElementType = 'p'> = {
  asComponent?: T
  children?: ReactNode
  className?: string
  color?: 'error' | 'inherit' | 'link' | 'primary' | 'secondary'
  variant?:
    | 'bold_text_14'
    | 'bold_text_16'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'medium_text_14'
    | 'regular_link'
    | 'regular_text_14'
    | 'regular_text_16'
    | 'semi-bold_small_text'
    | 'small_link'
    | 'small_text'
}

export const Typography = <T extends ElementType = 'p'>(
  props: Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & TypographyProps<T>
) => {
  const {
    asComponent: Component = 'p',
    className,
    color,
    href,
    variant = 'regular_text_14',
    ...rest
  } = props

  const classNames = clsx(s[variant], color && s[color], className)

  return <Component className={classNames} {...rest} />
}
