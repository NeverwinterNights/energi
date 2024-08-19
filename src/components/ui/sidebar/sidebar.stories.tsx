import type { Meta, StoryObj } from "@storybook/react";

import { Sidebar } from "./index";

import s from "./sidebar.module.scss";
import { Typography } from "@/components/ui";
import { CalendarIcon, HomeOutline, Person } from "@/assets/icons";

const meta = {
  title: "UI Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=314-6048&mode=dev",
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarItems = [
  { href: "/", text: "Home", icon: <HomeOutline /> },
  { href: "/users", text: "Users", icon: <Person /> },
  { href: "/ads", text: "ads", icon: <CalendarIcon /> },
];

export const Default: Story = {
  args: {
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
