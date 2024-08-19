import { Header, Sidebar, Typography } from "@/components/ui";
import { CalendarIcon, HomeOutline, Person } from "@/assets/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import s from "./sidebar-layout.module.scss";
import { useAppSelector } from "@/store/store";
import { isAuthenticated } from "@/store/auth-slice";
import { clsx } from "clsx";

const sidebarItems = [
  { href: "/", text: "Home", icon: <HomeOutline /> },
  { href: "/users", text: "Users", icon: <Person /> },
  { href: "/ads", text: "Advert", icon: <CalendarIcon /> },
];
export const SidebarLayout = () => {
  const isAuth = useAppSelector(isAuthenticated);
  const classNames = {
    sidebarItem: (href: string) =>
      clsx(s.item, {
        [s.active]:
          currentPath === href ||
          (href !== "/" && currentPath.startsWith(href)),
      }),
  };
  const location = useLocation(); // Получаем информацию о текущем URL
  const currentPath = location.pathname;
  console.log("currentPath", currentPath);
  return (
    <>
      <Header isAuth={isAuth} />
      <div className={s.root}>
        <Sidebar className={s.sidebar}>
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={classNames.sidebarItem(item.href)}
            >
              <>
                {item.icon}
                <Typography color="inherit">{item.text}</Typography>
              </>
            </NavLink>
          ))}
        </Sidebar>
        <Outlet />
      </div>
    </>
  );
};
