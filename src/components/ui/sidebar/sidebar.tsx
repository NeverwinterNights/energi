import { ReactNode } from "react";

import s from "./sidebar.module.scss";
import { Scrollbar } from "@/components/ui";

type SidebarProps = {
  children: ReactNode;
  className?: string;
};

export const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <div className={`${s.root} ${className ? className : ""}`}>
      <Scrollbar>{children}</Scrollbar>
    </div>
  );
};
