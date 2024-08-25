import React from "react";

import { Typography } from "@/components/ui";
import { useTimeAgo } from "@/hooks";
import { User } from "@/types";

import s from "./user-card.module.scss";

type Props = {
  user: User;
};
export const UserCard = React.memo(({ user }: Props) => {
  return (
    <div className={s.root}>
      <Typography variant={"bold_text_14"}>{user.username}</Typography>
      <Typography
        variant={"bold_text_14"}
      >{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography> Email: {user.email}</Typography>
      <Typography> Phone: {user.phone}</Typography>
      <Typography>
        Registered:{" "}
        {user.createdAt ? useTimeAgo(new Date(user.createdAt)) : "no data"}
      </Typography>
    </div>
  );
});
