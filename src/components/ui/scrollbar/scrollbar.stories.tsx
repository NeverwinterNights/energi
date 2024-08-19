import type { Meta, StoryObj } from "@storybook/react";

import { Scrollbar } from "./index";

import s from "./scrollbar.module.scss";
import { Typography } from "@/components/ui";
import { CalendarIcon, HomeOutline, Person } from "@/assets/icons";

const meta = {
  title: "UI Components/Scrollbar",
  component: Scrollbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Scrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarItems = [
  { href: "/", text: "Home", icon: <HomeOutline /> },
  { href: "/users", text: "Users", icon: <Person /> },
  { href: "/ads", text: "ads", icon: <CalendarIcon /> },
];

export const Vertical: Story = {
  args: {
    maxHeight: 100,
    children: (
      <>
        {sidebarItems.map((item, index) => (
          <a key={index} href={item.href} className={s.item}>
            <>
              {item.icon}
              <Typography>{item.text}</Typography>
            </>
          </a>
        ))}
      </>
    ),
  },
};
