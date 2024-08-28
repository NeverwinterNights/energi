import type { Meta, StoryObj } from "@storybook/react";

import { ChangeEvent, useState } from "react";

import { Input } from "./input";

const meta = {
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["text", "password"],
    },
  },
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=316-7901&mode=dev",
    },
  },
  tags: ["autodocs"],
  title: "UI Components/Input",
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainTextField: Story = {
  args: {
    disabled: false,
    label: "Click here",
    value: "Simple text-field",
  },
  render: () => {
    const [value, setValue] = useState("");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    };

    return <Input onChange={onChange} value={value} />;
  },
};
export const TextFieldWithPlaceHolder: Story = {
  args: {
    disabled: false,
    label: "Click here",
    placeholder: "Type Something",
  },
  render: () => {
    const [value, setValue] = useState("");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    };

    return (
      <Input onChange={onChange} placeholder={"Type Something"} value={value} />
    );
  },
};
export const TextFieldPassword: Story = {
  args: {
    disabled: false,
    label: "Click here",
    type: "password",
    value: "",
  },
  render: () => {
    const [value, setValue] = useState("");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    };

    return <Input onChange={onChange} type={"password"} value={value} />;
  },
};

export const TextFieldWithPlaceHolderAndSearch: Story = {
  args: {
    disabled: false,
    label: "Click here",
    placeholder: "Placeholder",
    searchInput: true,
    type: "text",
    value: "Simple text-field",
  },
  render: () => {
    const [value, setValue] = useState("");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    };

    return <Input onChange={onChange} searchInput value={value} />;
  },
};
