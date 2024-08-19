import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useCallback,
  useState,
} from "react";

import { clsx } from "clsx";

import s from "./input.module.scss";

import { Typography } from "../typography";
import { ClosedInputIcon, Eye, EyeClosed, SearchIcon } from "@/assets/icons";

export type InputPropsType = {
  error?: string;
  inputTextClassName?: string;
  label?: string;
  onClickClearInput?: () => void;
  searchInput?: boolean;
  startIcon?: ReactElement | string;
  width?: string;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      className,
      disabled,
      startIcon,
      error,
      inputTextClassName,
      label,
      onChange,
      onClickClearInput,
      placeholder,
      searchInput,
      type,
      value = "",
      width,
      ...restProps
    },
    ref,
  ) => {
    const [iconVisible, setIconVisible] = useState(type);

    const classNames = {
      inpText: clsx(s.input, inputTextClassName),
      input: clsx(s.inputContainer, !!error && s.error, className),
      label: clsx(s.inputContainer, !!error && s.error, className),
    };

    const iconClickHandler = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIconVisible(() =>
          iconVisible === "password" ? "text" : "password",
        );
      },
      [iconVisible],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <div className={clsx(s.main, disabled && s.disabled)} style={{ width }}>
        {label && (
          <div>
            <Typography
              className={s.label}
              color={"secondary"}
              variant={"regular_text_14"}
            >
              {label}
            </Typography>
          </div>
        )}
        <div className={classNames.input}>
          {searchInput && (
            <span
              className={s.icon}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </span>
          )}
          {startIcon && (
            <span
              className={s.icon}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {startIcon}
            </span>
          )}
          <input
            className={classNames.inpText}
            disabled={disabled}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={iconVisible}
            value={value}
            {...restProps}
          />
          {searchInput && value.toString()?.length > 0 && (
            <span className={s.closedImp} onClick={onClickClearInput}>
              <ClosedInputIcon />
            </span>
          )}
          {(type === "password" || iconVisible === "password") && (
            <button
              className={s.fakebutton}
              disabled={disabled}
              onClick={iconClickHandler}
            >
              {iconVisible === "password" ? (
                <Eye color={disabled ? "var(--dark-100)" : ""} />
              ) : (
                <EyeClosed color={disabled ? "var(--dark-100)" : ""} />
              )}
            </button>
          )}
        </div>
        <div className={s.errorContainer}>
          {error && (
            <div style={{ margin: "4px 0" }}>
              <Typography color={"error"} variant={"error"}>
                {error}
              </Typography>
            </div>
          )}
        </div>
      </div>
    );
  },
);
