import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

import { ChangeEvent } from "react";
import { TextArea, TextAreaProps } from "@/components/ui";

export type ControlledTextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  setValueFromForm?: (value: string) => void;
} & Omit<TextAreaProps, "onChange" | "value" | "id">;

export const ControlledTextArea = <T extends FieldValues>({
  control,
  name,
  setValueFromForm,
  className,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (setValueFromForm) {
      setValueFromForm(e.target.value);
    }
    onChange(e.target.value);
  };

  return (
    <TextArea
      error={error?.message}
      className={className ? className : ""}
      onChange={onChangeHandler}
      value={value}
      {...rest}
    />
  );
};
