import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './text-area.module.scss'

import { Typography } from '../typography'

export type TextAreaProps = {
  className?: string
  classNameTextArea?: string
  counter?: number
  error?: string
  errorMessage?: string
  label?: string
  onClearClick?: () => void
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, classNameTextArea, counter, disabled, error, label, ...rest } = props
  const classNames = {
    root: clsx(s.root, className),
    textArea: clsx(s.textarea, error && s.error, classNameTextArea),
  }

  return (
    <div className={classNames.root}>
      <Typography
        asComponent={'label'}
        className={`${s.label} ${disabled && s.disabled}`}
        variant={'regular_text_14'}
      >
        {label}
      </Typography>
      <div className={`${s.container} ${error ? s.error : ''} ${disabled ? s.disabled : ''}`}>
        <textarea disabled={disabled} ref={ref} {...rest} className={classNames.textArea} />
      </div>
      <div className={s.footer}>
        <div className={s.errorContainer}>
          {error && (
            <Typography
              asComponent={'div'}
              className={s.error}
              color={'error'}
              variant={'regular_text_14'}
            >
              {error}
            </Typography>
          )}
        </div>
        {counter && (
          <Typography
            asComponent={'span'}
            color={'secondary'}
            style={{ marginTop: '3px', textAlign: 'end' }}
            variant={'small_text'}
          >
            {rest?.value?.toString().length}/{counter}
          </Typography>
        )}
      </div>
    </div>
  )
})
