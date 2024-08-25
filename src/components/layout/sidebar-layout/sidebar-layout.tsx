import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import {
  CalendarIcon,
  HomeOutline,
  Person,
  PersonOutline,
} from "@/assets/icons";
import { Header, Sidebar, Typography } from "@/components/ui";
import { fetchCurrentUser, isAuth } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clsx } from "clsx";

import s from "./sidebar-layout.module.scss";

const sidebarItems = [
  { href: "/", text: "Home", icon: <HomeOutline /> },
  { href: "/profile", text: "Profile", icon: <PersonOutline /> },
  { href: "/users", text: "Users", icon: <Person /> },
  { href: "/ads", text: "Advert", icon: <CalendarIcon /> },
];

export const SidebarLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Проверка авторизации при монтировании компонента
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  const isAuthUser = useAppSelector(isAuth);
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

  return (
    <>
      <Header isAuth={isAuthUser} />
      <div className={s.root}>
        {isAuthUser && (
          <Sidebar className={s.sidebar}>
            {sidebarItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={classNames.sidebarItem(item.href)}
              >
                <>
                  {item.icon}
                  <Typography color={"inherit"}>{item.text}</Typography>
                </>
              </NavLink>
            ))}
          </Sidebar>
        )}
        <Outlet />
      </div>
    </>
  );
};
