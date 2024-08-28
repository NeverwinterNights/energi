import { useEffect } from "react";

import { UserCard } from "@/components/user-card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchAllUsers, getAllUsers } from "@/store/user-slice";

import s from "./users.module.scss";

export const Users = () => {
  const allUsers = useAppSelector(getAllUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className={s.root}>
      {allUsers.map((user) => (
        <div key={user.uid} style={{ padding: "0 15px", flex: "1 1 50%" }}>
          <UserCard className={s.userItem} user={user} />
        </div>
      ))}
    </div>
  );
};
