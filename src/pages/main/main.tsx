import { Button, Modal, Sidebar, Typography } from "@/components/ui";
import { CreateUserModal } from "@/components/create-user-modal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addUser, selectUsers } from "@/store/user-slice";
import { CreateUserFormValues } from "@/schemas/create-user-modal-schema";
import { CalendarIcon, HomeOutline, Person } from "@/assets/icons";
import { NavLink, useParams } from "react-router-dom";
import s from "./main.module.scss";

const sidebarItems = [
  { href: "/", text: "Home", icon: <HomeOutline /> },
  { href: "/users", text: "Users", icon: <Person /> },
  { href: "/ads", text: "Advert", icon: <CalendarIcon /> },
];

export const Main = () => {
  const [open, setOpen] = useState(false);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const { route } = useParams();
  const addUserHandler = (data: CreateUserFormValues) => {
    dispatch(addUser(data));
  };
  console.log("users", users);
  console.log("params", route);
  return (
    <div>
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={`${s.item} ${item.href.includes(route!) ? s.active : ""}`}
          >
            <>
              {item.icon}
              <Typography color="inherit">{item.text}</Typography>
            </>
          </NavLink>
        ))}
      </Sidebar>
      <Button onClick={setOpen} variant={"primary"}>
        open
      </Button>

      <Modal title={"Create User"} isOpen={open} onOpenChange={setOpen}>
        <CreateUserModal onClick={addUserHandler} />
      </Modal>
    </div>
  );
};
